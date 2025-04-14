import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;
axios.defaults.baseURL = URL;

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
      // ✅ Add check for existing file URL
      setFileUrl(existingFileUrl);

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
  }, [existingFileUrl]); // ✅ Add dependency

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setAction("upload");
    try {
      setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fieldName", fieldName);

      const response = await axios.post(
        `${URL}/api/users/${applicationId}/uploadSingle`,
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
        toast.success("File uploaded successfully");
      }
    } catch (error) {
      console.error("Upload error:", error);
      // alert(error.response?.data?.message || "File upload failed");
      toast.error("File upload failed try uploading again");
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
        `${URL}/api/users/${applicationId}/deleteSingle?fieldName=${fieldName}&fileUrl=${encodeURIComponent(
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
      // alert("Error deleting file");
      toast.error("Error deleting file");
    } finally {
      setUploading(false);
      setAction("");
    }
  };

  return (
    <div className="mb-4">
      <Toaster position="top-right" />
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
            accept=".pdf,.png,.jpg,.jpeg,.docx,.mp4, .mov, .avi, .mp3, .wav, .mkv"
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
