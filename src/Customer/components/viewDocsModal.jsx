import React from "react";

const DocumentModal = ({ isOpen, onClose, docLink }) => {
  if (!isOpen) return null; // Don't render if modal is not open

  // Use Google Docs Viewer for previewing PDFs, DOCX, etc.
  const googleDocsViewer = `https://docs.google.com/gview?url=${encodeURIComponent(
    docLink
  )}&embedded=true`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-800">View Document</h2>

        {/* iFrame for the document */}
        {console.log(docLink)}

        <div className="mt-4">
          <iframe
            src={docLink}
            className="w-full h-[80vh] border rounded-md"
            title="Document Viewer"
          ></iframe>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;
