import JSZip from "jszip";
import { saveAs } from "file-saver";

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
        const proxyUrl = `http://localhost:5000/proxy-file?url=${encodeURIComponent(
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
