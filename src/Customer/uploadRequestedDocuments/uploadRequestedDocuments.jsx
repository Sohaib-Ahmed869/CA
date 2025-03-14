import React, { useState, useEffect } from "react";
import SingleFileUploader from "../uploadDocuments/SingleFileUploader";

const UploadRequestedDocuments = ({ applications, applicationId }) => {
  const [uploadedDocuments, setUploadedDocuments] = useState({});

  useEffect(() => {
    if (applications?.requestedDocuments) {
      const initialDocs = {};
      applications.requestedDocuments.forEach((doc) => {
        initialDocs[doc.id] = ""; // Empty string for initial file URL
      });
      setUploadedDocuments(initialDocs);
    }
  }, [applications]); // Depend on `applications`, not `application`

  if (!applications) {
    return <p>Loading requested documents...</p>;
  }

  return (
    <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
        Requested Documents
      </h3>
      {console.log(applications.applicationId)}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {applications?.requestedDocuments?.map((doc) => (
          <div key={doc.id} className="relative">
            <SingleFileUploader
              applicationId={applicationId}
              fieldName={doc.name}
              label={doc.name}
              required={true}
              onUploadSuccess={(field, fileUrl) =>
                setUploadedDocuments((prev) => ({
                  ...prev,
                  [doc.id]: fileUrl,
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
