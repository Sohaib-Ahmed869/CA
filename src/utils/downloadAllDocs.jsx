import JSZip from "jszip";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

export async function downloadAllDocsAsZip(
  documentLinks,
  DocumentName,
  stateHandlers
) {
  // Set loading state to true
  stateHandlers.loading(true);

  console.log(documentLinks);
  try {
    const zip = new JSZip();
    console.log("Starting download of", documentLinks.length, "documents");

    // Add progress tracking
    let completed = 0;
    const total = documentLinks.length;

    // Create array to track progress of each file
    const progressArray = documentLinks.map(() => ({
      status: "pending",
      message: "Waiting...",
    }));

    // Function to update UI progress
    const updateProgress = () => {
      console.log(`Progress: ${completed}/${total} files processed`);
    };

    // Process files sequentially to avoid overwhelming the server
    for (let i = 0; i < documentLinks.length; i++) {
      const doc = documentLinks[i];

      try {
        if (!doc.url?.fileUrl) {
          console.warn(`File ${i + 1} has no valid URL! Skipping...`);
          progressArray[i] = { status: "failed", message: "Missing URL" };
          completed++;
          updateProgress();
          continue;
        }

        progressArray[i] = {
          status: "downloading",
          message: "Downloading...",
        };
        updateProgress();

        // Use your proxy endpoint
        const proxyUrl = `${URL}/proxy-file?url=${encodeURIComponent(
          doc.url.fileUrl
        )}`;
        console.log(`Fetching file ${i + 1}: ${doc.name || "Unnamed"}`);

        const response = await fetch(proxyUrl, {
          method: "GET",
          cache: "no-store", // Force fresh request
          headers: {
            Accept: "*/*",
          },
          // Set a timeout for the request
          signal: AbortSignal.timeout(60000), // 60 second timeout
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Server responded with ${response.status}: ${errorText}`
          );
        }

        const blob = await response.blob();

        // Skip empty files
        if (blob.size === 0) {
          console.warn(`File ${i + 1} has zero size, skipping`);
          progressArray[i] = { status: "failed", message: "Empty file" };
          completed++;
          updateProgress();
          continue;
        }

        console.log(
          `File ${i + 1}: Size - ${(blob.size / 1024).toFixed(1)}KB, Type - ${
            blob.type
          }`
        );

        // Determine filename with extension
        let filename = doc.name || `document_${i + 1}`;
        if (!filename.includes(".")) {
          // Try to determine extension from MIME type
          const extension = blob.type.split("/")[1] || "bin";
          filename += `.${extension}`;
        }

        // Add to zip
        zip.file(filename, blob);
        progressArray[i] = { status: "success", message: "Done" };
      } catch (error) {
        console.error(
          `Error fetching file ${i + 1} (${doc?.name || "unnamed"}):`
        );
        console.error(`- URL: ${doc?.url?.fileUrl}`);
        console.error(`- Error: ${error.message}`);
        progressArray[i] = { status: "failed", message: error.message };
      }

      completed++;
      updateProgress();
    }

    // Count successful files
    const successCount = progressArray.filter(
      (p) => p.status === "success"
    ).length;

    if (successCount === 0) {
      console.error(
        "No files were successfully downloaded, ZIP creation aborted"
      );
      alert("Failed to download any files. Check console for details.");
      // Set loading state to false and success to false
      stateHandlers.loading(false);
      stateHandlers.success(false);
      return;
    }

    console.log(`Download complete: ${successCount}/${total} files successful`);
    console.log("Generating ZIP file...");

    // Generate and download the ZIP
    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 5 },
    });

    saveAs(zipBlob, `${DocumentName} documents.zip`);
    console.log("ZIP file created and download started");

    // Set loading state to false and success to true
    stateHandlers.loading(false);
    stateHandlers.success(true);
  } catch (error) {
    console.error("ZIP Download Error:", error);
    alert(`ZIP creation failed: ${error.message}`);

    // Set loading state to false and success to false
    stateHandlers.loading(false);
    stateHandlers.success(false);
  }
}

export const downloadCertificate = async (
  url,
  filename = "certificate.pdf"
) => {
  // Show loading indicator or message
  const loadingToast = toast.loading("Downloading certificate...");

  try {
    // Use the proxy endpoint to fetch the file - replace URL with your actual proxy endpoint
    const proxyUrl = `${URL}/proxy-file?url=${encodeURIComponent(url)}`;

    console.log(`Fetching certificate: ${filename}`);

    const response = await fetch(proxyUrl, {
      method: "GET",
      cache: "no-store", // Force fresh request
      headers: {
        Accept: "*/*",
      },
      // Set a reasonable timeout
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    // Check if the fetch was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    // Get the blob from the response
    const blob = await response.blob();

    // Skip empty files
    if (blob.size === 0) {
      throw new Error("Downloaded file is empty");
    }

    console.log(
      `Certificate downloaded: Size - ${(blob.size / 1024).toFixed(
        1
      )}KB, Type - ${blob.type}`
    );

    // Create a blob URL for the file
    const blobUrl = window.URL.createObjectURL(blob);

    // Create a temporary anchor element
    const downloadLink = document.createElement("a");

    // Set properties to trigger download
    downloadLink.href = blobUrl;
    downloadLink.download = filename;

    // Append to body, click, and remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);

    // Show success message
    toast.success("Certificate downloaded successfully");
  } catch (error) {
    console.error("Error downloading certificate:", error);
    // User-friendly error handling
    toast.error(`Failed to download certificate: ${error.message}`);
  } finally {
    // Hide loading indicator
    toast.dismiss(loadingToast);
  }
};
