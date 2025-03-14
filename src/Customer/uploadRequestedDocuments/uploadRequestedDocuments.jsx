import React, { useState, useEffect } from "react";
import SingleFileUploader from "../uploadDocuments/SingleFileUploader";

const UploadRequestedDocuments = ({ applications, applicationId }) => {
  const [uploadedDocuments, setUploadedDocuments] = useState({});

  useEffect(() => {
    if (applications?.requestedDocuments && applications?.documents) {
      const initialDocs = {};
      applications.requestedDocuments.forEach((doc) => {
        // Extract the existing file URL correctly
        const matchedFile = applications.documentsForm[doc.name];
        initialDocs[doc.id] = matchedFile?.fileUrl || ""; // Ensure we get the fileUrl
      });
      setUploadedDocuments(initialDocs);
    }
  }, [applications]); // Update when applications change

  if (!applications) {
    return <p>Loading requested documents...</p>;
  }
  console.log("Documents:", applications?.documents);

  return (
    <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
        {applications?.requestedDocuments && "Requested Documents"}
      </h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {applications?.requestedDocuments?.map((doc) => (
          <div key={doc.id} className="relative">
            <SingleFileUploader
              applicationId={applicationId}
              fieldName={doc.name}
              label={doc.name}
              existingFileUrl={uploadedDocuments[doc.id] || ""} // Corrected lookup
              required={true}
              onUploadSuccess={(field, fileUrl) =>
                setUploadedDocuments((prev) => ({
                  ...prev,
                  [doc.id]: fileUrl, // Correctly updating the uploaded document URL
                }))
              }
              onDeleteSuccess={() =>
                setUploadedDocuments((prev) => ({
                  ...prev,
                  [doc.id]: "",
                }))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadRequestedDocuments;
