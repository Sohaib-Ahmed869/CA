import React from "react";

const DocumentModal = ({ isOpen, onClose, docLink }) => {
  console.log("document link ", docLink);

  if (!isOpen) return null;

  // Determine file type from URL
  const getFileType = (url) => {
    const extension = url.split(".").pop().split(/#|\?/)[0].toLowerCase();
    const imageTypes = ["png", "jpg", "jpeg", "gif", "webp"];
    const videoTypes = ["mp4", "webm", "ogg", "mov", "avi"];
    if (videoTypes.includes(extension)) return "video";
    if (imageTypes.includes(extension)) return "image";

    return "document";
  };

  const fileType = getFileType(docLink);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button - moved to top-right */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl md:top-2 md:right-2 md:text-gray-500 md:text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          View Document
        </h2>

        <div className="min-h-[60vh]">
          {fileType === "image" ? (
            <img
              src={docLink}
              alt="Preview"
              className="max-w-full max-h-[70vh] object-contain mx-auto"
            />
          ) : fileType === "video" ? (
            // Using HTML5 video player for better native controls
            <video
              controls
              src={docLink}
              className="w-full max-h-[70vh] object-contain mx-auto"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                docLink
              )}&embedded=true`}
              className="w-full h-[70vh] border rounded-md"
            />
          )}
        </div>

        {/* Secondary close button at bottom */}
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
// const DocumentModal = ({ isOpen, onClose, docLink }) => {
//   console.log("document link ", docLink);

//   if (!isOpen) return null;

//   // Determine file type from URL
//   const getFileType = (url) => {
//     const extension = url.split(".").pop().split(/#|\?/)[0].toLowerCase();
//     const imageTypes = ["png", "jpg", "jpeg", "gif", "webp"];
//     return imageTypes.includes(extension) ? "image" : "document";
//   };

//   const fileType = getFileType(docLink);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
//         <h2 className="text-xl font-semibold text-gray-800">View Document</h2>

//         <div className="mt-4 flex items-center justify-center min-h-[60vh]">
//           {fileType === "image" ? (
//             // Render image directly
//             <img
//               src={docLink}
//               alt="Preview"
//               className="max-w-full max-h-[80vh] object-contain"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "fallback-image-url";
//               }}
//             />
//           ) : (
//             // Use Google Docs Viewer for documents
//             <iframe
//               src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                 docLink
//               )}&embedded=true&ui=2&zoom=fit`}
//               className="w-full h-[80vh] border rounded-md overflow-hidden"
//               title="Document Viewer"
//               scrolling="no"
//             />
//           )}
//         </div>

//         <div className="flex justify-end mt-4">
//           <button
//             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// AGREEMENT MODAL
// export const AgreementDocumentModal = ({ isOpen, onClose, docLink }) => {
//   if (!isOpen) return null; // Don't render if modal is not open

//   // Use Google Docs Viewer for previewing PDFs, DOCX, etc.
//   const googleDocsViewer = `https://docs.google.com/gview?url=${encodeURIComponent(
//     docLink
//   )}&embedded=true`;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
//         <h2 className="text-xl font-semibold text-gray-800">View Document</h2>

//         {/* iFrame for the document */}
//         {console.log(docLink)}

//         <div className="mt-4">
//           <iframe
//             src={docLink}
//             className="w-full h-[80vh] border rounded-md"
//             title="Document Viewer"
//           ></iframe>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end mt-4">
//           <button
//             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
export const AgreementDocumentModal = ({ isOpen, onClose, docLink }) => {
  if (!isOpen) return null;

  // Determine if it's a PDF
  const isPDF = docLink?.toLowerCase().endsWith(".pdf");

  // Create a secure embed URL
  const getEmbedUrl = () => {
    if (isPDF) {
      return docLink;
    } else {
      return `https://docs.google.com/gview?url=${encodeURIComponent(
        docLink
      )}&embedded=true`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl sm:max-w-3xl flex flex-col h-[90vh] sm:h-[85vh]">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Document Viewer
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Document viewer with fallback - increased height */}
        <div className="flex-1 overflow-hidden bg-gray-100 min-h-[300px] sm:min-h-[400px]">
          {docLink ? (
            <div className="w-full h-full flex flex-col">
              {/* Primary viewer */}
              <div className="flex-1 overflow-hidden">
                <object
                  data={getEmbedUrl()}
                  type={isPDF ? "application/pdf" : "text/html"}
                  className="w-full h-full"
                >
                  <iframe
                    src={getEmbedUrl()}
                    className="w-full h-full border-0"
                    title="Document Viewer"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    loading="lazy"
                  >
                    <p className="p-4 text-center">
                      Unable to display document. Please download using the
                      button below.
                    </p>
                  </iframe>
                </object>
              </div>

              {/* Fallback notice for mobile */}
              <div className="p-2 bg-yellow-50 border-t border-yellow-100 text-xs text-center block sm:hidden">
                Having trouble viewing? Please use the download option below.
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-4">
              <p className="text-gray-500">No document available to display</p>
            </div>
          )}
        </div>

        {/* Footer with buttons */}
        <div className="p-3 sm:p-4 border-t flex justify-between items-center">
          <a
            href={docLink}
            download
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
          >
            Download
          </a>

          <button
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-500 text-white rounded hover:bg-gray-700 text-sm sm:text-base ml-2"
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
