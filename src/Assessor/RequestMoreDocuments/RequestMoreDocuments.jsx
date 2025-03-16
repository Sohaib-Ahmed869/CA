import React, { useState, useEffect } from "react";
import { requestDocuments } from "../../Customer/Services/RequestDocs";
import toast from "react-hot-toast";
import { getApplications } from "../../Customer/Services/adminServices";

const RequestMoreDocuments = ({ onClose, applicationId }) => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch application data when component mounts or applicationId changes
  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        setLoading(true);
        const response = await getApplications();

        // Find the specific application by ID
        const application = response.find((app) => app.id === applicationId);

        if (application) {
          setApplicationData(application);
        } else {
          toast.error("Application not found");
        }
      } catch (error) {
        console.error("Error fetching application data:", error);
        toast.error("Failed to load application data");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [applicationId, refreshKey]);

  // Reset component state when refreshKey changes
  useEffect(() => {
    setDocuments([]);
    setNewDocument("");
    setIsSubmitting(false);
  }, [refreshKey]);

  // Get requested and uploaded documents from applicationData
  const previouslyRequestedDocuments =
    applicationData?.requestedDocuments || [];
  const uploadedDocuments = applicationData?.document || {};

  console.log("Previously requested docs:", previouslyRequestedDocuments);
  console.log("New request docs:", documents);

  // Normalize string by removing spaces and converting to lowercase
  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, "");

  // Extract and normalize uploaded document names
  const normalizedUploadedDocs = {};
  Object.keys(uploadedDocuments || {}).forEach((key) => {
    if (uploadedDocuments[key] && uploadedDocuments[key].fileUrl) {
      normalizedUploadedDocs[normalizeString(key)] = uploadedDocuments[key];
    }
  });

  // Handles adding a new requested document
  const handleAddDocument = () => {
    if (newDocument.trim() === "") return;

    const normalizedNewDoc = normalizeString(newDocument);

    // Check if the document is already in the new requests list
    if (
      documents.some((doc) => normalizeString(doc.name) === normalizedNewDoc)
    ) {
      toast.error(`"${newDocument}" is already in your request list.`);
      return;
    }

    // Check if the document is already in previously requested documents
    if (
      previouslyRequestedDocuments &&
      previouslyRequestedDocuments.some(
        (doc) => normalizeString(doc.name) === normalizedNewDoc
      )
    ) {
      toast.error(`"${newDocument}" was already requested previously.`);
      return;
    }

    // Check if the document is already uploaded
    if (normalizedUploadedDocs[normalizedNewDoc]) {
      toast.error(`"${newDocument}" is already uploaded.`);
      return;
    }

    setDocuments([
      ...documents,
      {
        id: Date.now(),
        name: newDocument.trim(),
        requestedDate: new Date().toISOString(),
        isEditing: false,
      },
    ]);
    toast.success(`${newDocument} Added for Requesting!`);

    setNewDocument("");
  };

  // Handles submitting the request
  const handleSubmit = async () => {
    if (documents.length === 0) {
      toast.error("Please add at least one document to request");
      return;
    }

    setIsSubmitting(true);
    try {
      await requestDocuments(applicationId, documents);
      toast.success("Documents requested successfully!");
      // Reset this component's state
      setRefreshKey((prevKey) => prevKey + 1);

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Something went wrong!");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex justify-center">
          <div className="loader border-t-2 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Request More Documents</h2>

        {/* Previously Requested Documents */}
        {previouslyRequestedDocuments?.length > 0 && (
          <div className="mb-4 p-3 border rounded bg-gray-100">
            <h3 className="text-sm font-medium mb-2">
              Previously Requested Documents
            </h3>
            <ul className="space-y-1">
              {previouslyRequestedDocuments.map((doc, index) => {
                const normalizedDocName = normalizeString(doc.name);
                const isUploaded = !!normalizedUploadedDocs[normalizedDocName];

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

        {/* Newly Requested Documents */}
        {documents.length > 0 && (
          <div className="mb-4 p-3 border rounded bg-gray-100">
            <h3 className="text-sm font-medium mb-2">
              Newly Requested Documents
            </h3>
            <ul className="space-y-1">
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="text-sm flex justify-between items-center"
                >
                  <span>{doc.name}</span>
                  <button
                    onClick={() => {
                      setDocuments(documents.filter((d) => d.id !== doc.id));
                      toast.success(`${doc.name} removed from request list`);
                    }}
                    className="text-xs px-2 py-1 rounded bg-red-200 text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
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

        {/* Submit Button with Loader */}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full flex justify-center items-center"
          disabled={isSubmitting || documents.length === 0}
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
