import React, { useState } from "react";
import { requestDocuments } from "../../Customer/Services/RequestDocs";

const RequestMoreDocuments = ({
  onClose,
  applicationId,
  PreviouslyRequestedDocuments,
  UploadedDocuments,
}) => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("Previously requested docs:", PreviouslyRequestedDocuments);
  console.log("New request docs:", documents);

  // Extract uploaded document names from UploadedDocuments
  const uploadedDocs = Object.keys(UploadedDocuments || {}).filter(
    (key) => UploadedDocuments[key] && UploadedDocuments[key].fileUrl
  );

  // Handles adding a new requested document
  const handleAddDocument = () => {
    if (newDocument.trim() === "") return;

    // Check if the document is already uploaded
    if (uploadedDocs.includes(newDocument.toLowerCase())) {
      alert(`"${newDocument}" is already uploaded.`);
      return;
    }

    setDocuments([
      ...documents,
      {
        id: Date.now(),
        name: newDocument,
        requestedDate: new Date().toISOString(),
        isEditing: false,
      },
    ]);
    setNewDocument("");
  };

  // Handles submitting the request
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await requestDocuments(applicationId, documents);
      alert("Documents requested successfully!");
      setDocuments([]);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Request More Documents</h2>

        {/* Previously Requested Documents */}
        {/* Previously Requested Documents List */}
        {PreviouslyRequestedDocuments?.length > 0 && (
          <div className="mb-4 p-3 border rounded bg-gray-100">
            <h3 className="text-sm font-medium mb-2">
              Previously Requested Documents
            </h3>
            <ul className="space-y-1">
              {PreviouslyRequestedDocuments.map((doc, index) => {
                const docKey = doc.name.toLowerCase().replace(/\s+/g, "_"); // Convert name to key format
                const normalizedUploadedDocs = Object.keys(
                  UploadedDocuments || {}
                ).reduce((acc, key) => {
                  acc[key.toLowerCase().replace(/\s+/g, "_")] =
                    UploadedDocuments[key];
                  return acc;
                }, {});

                const isUploaded = !!normalizedUploadedDocs[docKey]?.fileUrl;

                return (
                  <li
                    key={index}
                    className="text-sm flex justify-between items-center"
                  >
                    <span>{doc.name}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        isUploaded
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {isUploaded ? "Uploaded" : "Pending"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Input for New Document */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newDocument}
            onChange={(e) => setNewDocument(e.target.value)}
            placeholder="Enter document name"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddDocument}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Request
          </button>
        </div>

        {/* List of New Requested Documents */}
        <div className="mt-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between mb-2 p-2 border rounded"
            >
              <span>{doc.name}</span>
              <button
                onClick={() =>
                  setDocuments(documents.filter((d) => d.id !== doc.id))
                }
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button with Loader */}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-600   text-white px-4 py-2 rounded w-full flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loader border-t-2 border-white border-solid rounded-full w-5 h-5 animate-spin"></span>
          ) : (
            "Submit Request"
          )}
        </button>

        {/* Close Modal */}
        <button
          onClick={onClose}
          className="mt-2 text-gray-500 underline text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RequestMoreDocuments;
