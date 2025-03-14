// import React, { useState } from "react";
// import axios from "axios";
// import { FaTrash } from "react-icons/fa";

// axios.defaults.baseURL = "http://localhost:5000/";

// const SingleFileUploader = ({
//   applicationId,
//   fieldName,
//   label,
//   existingFileUrl = "",
//   onUploadSuccess,
//   onDeleteSuccess,
// }) => {
//   const [fileUrl, setFileUrl] = useState(existingFileUrl);
//   const [fileName, setFileName] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [action, setAction] = useState("");

//   // Called when the user selects a file
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       alert("File size is too large. Maximum file size is 5MB.");
//       return;
//     }

//     setUploading(true);
//     setAction("upload");
//     try {
//       setFileName(file.name);
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("fieldName", fieldName);
//       const response = await axios.post(
//         `/api/users/${applicationId}/uploadSingle`,
//         formData
//       );

//       const uploadedUrl = response.data.fileUrl;
//       setFileUrl(uploadedUrl);

//       if (onUploadSuccess) {
//         onUploadSuccess(fieldName, uploadedUrl);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Only PDF, PNG, JPG, DOCX, and MP4 files are allowed");
//     } finally {
//       setUploading(false);
//       setAction("");
//     }
//   };

//   const handleDelete = async () => {
//     if (!fileUrl) return;
//     setUploading(true);
//     setAction("delete");
//     try {
//       await axios.delete(
//         `/api/users/${applicationId}/deleteSingle?fieldName=${fieldName}`
//       );
//       setFileUrl("");
//       setFileName("");

//       if (onDeleteSuccess) {
//         onDeleteSuccess(fieldName);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error deleting file");
//     } finally {
//       setUploading(false);
//       setAction("");
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label className="block text-md text-gray-600 mb-1">{label}</label>
//       {fileUrl ? (
//         action === "delete" ? (
//           <div className="flex items-center border border-gray-300 rounded p-2 justify-center">
//             <span className="text-gray-600">Deleting...</span>
//           </div>
//         ) : (
//           <div className="flex items-center border border-gray-300 rounded p-2 justify-between">
//             <a
//               href={fileUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-grey-600 underline"
//             >
//               {fileName || "View File"}
//             </a>
//             <button
//               type="button"
//               onClick={handleDelete}
//               disabled={uploading}
//               className="text-red-500 ml-2"
//             >
//               <FaTrash />
//             </button>
//           </div>
//         )
//       ) : action === "upload" ? (
//         <div className="flex items-center border border-gray-300 rounded p-2 justify-center">
//           <span className="text-gray-600">Uploading...</span>
//         </div>
//       ) : (
//         <div className="flex items-center border border-gray-300 rounded p-2 justify-between">
//           <label
//             htmlFor={`${fieldName}-input`}
//             className="bg-gray-200 px-3 py-1 rounded cursor-pointer"
//           >
//             Choose File
//           </label>
//           <input
//             id={`${fieldName}-input`}
//             type="file"
//             disabled={uploading}
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           <span className="text-gray-600 ml-2 flex-1">No file chosen</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleFileUploader;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:5000/";

const SingleFileUploader = ({
  applicationId,
  fieldName,
  label,
  existingFileUrl = "",
  onUploadSuccess,
  onDeleteSuccess,
}) => {
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [action, setAction] = useState("");
  const [initializing, setInitializing] = useState(true);
  // Initialize with existing file URL
  useEffect(() => {
    if (existingFileUrl) {
      setFileUrl(existingFileUrl);

      // Proper URL parsing and filename extraction
      try {
        const url = new URL(existingFileUrl);
        const pathname = decodeURIComponent(url.pathname);
        const filename = pathname.split("/").pop().split("?")[0];
        setFileName(filename || "Uploaded File");
      } catch (error) {
        console.error("Error parsing URL:", error);
        setFileName("Uploaded File");
      }
    }
    setInitializing(false);
  }, [existingFileUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size is too large. Maximum file size is 5MB.");
      return;
    }

    setUploading(true);
    setAction("upload");
    try {
      setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fieldName", fieldName);

      const response = await axios.post(
        `/api/users/${applicationId}/uploadSingle`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedUrl = response.data.fileUrl;
      setFileUrl(uploadedUrl);
      if (onUploadSuccess) {
        onUploadSuccess(fieldName, uploadedUrl);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "File upload failed");
    } finally {
      setUploading(false);
      setAction("");
    }
  };

  const handleDelete = async () => {
    if (!fileUrl) return;

    if (!window.confirm("Are you sure you want to delete this file?")) return;

    setUploading(true);
    setAction("delete");
    try {
      await axios.delete(
        `/api/users/${applicationId}/deleteSingle?fieldName=${fieldName}&fileUrl=${encodeURIComponent(
          fileUrl
        )}`
      );
      setFileUrl("");
      setFileName("");
      if (onDeleteSuccess) {
        onDeleteSuccess(fieldName);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting file");
    } finally {
      setUploading(false);
      setAction("");
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-md text-gray-600 mb-1">{label}</label>

      {initializing ? (
        <div className="flex items-center border border-gray-300 rounded p-2 justify-center">
          <span className="text-gray-600">Loading...</span>
        </div>
      ) : fileUrl ? (
        <div className="flex items-center border border-gray-300 rounded p-2 justify-between">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 truncate"
            title={fileName}
          >
            {fileName.length > 20
              ? `${fileName.substring(0, 20)}...`
              : fileName}
          </a>
          {!uploading ? (
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 ml-2"
              disabled={uploading}
            >
              <FaTrash />
            </button>
          ) : (
            <span className="text-gray-500 ml-2">Deleting...</span>
          )}
        </div>
      ) : (
        <div className="flex items-center border border-gray-300 rounded p-2 justify-between">
          <label
            htmlFor={`${fieldName}-input`}
            className={`bg-gray-100 px-3 py-1 rounded cursor-pointer ${
              uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            {uploading ? "Uploading..." : "Choose File"}
          </label>
          <input
            id={`${fieldName}-input`}
            type="file"
            disabled={uploading}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.docx,.mp4"
          />
          <span className="text-gray-500 ml-2 truncate">
            {uploading ? fileName : "No file chosen"}
          </span>
        </div>
      )}
    </div>
  );
};

export default SingleFileUploader;
