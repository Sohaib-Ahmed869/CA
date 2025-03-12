import React, { useState } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";
import studentAgreementdoc from "../../../../public/1.pdf";
import studentApplicantAgreement from "../../../../public/2.pdf";
import TOCdoc from "../../../../public/3.pdf";
import DocumentModal from "../../components/viewDocsModal";

const StudentAgreement = ({ studentAgreement, setStudentAgreement }) => {
  const [DocumentModalOpen, setDocumentModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState("");

  // Function to open modal with selected document
  const openModal = (doc) => {
    setCurrentDoc(doc); // Directly set the file URL
    setDocumentModalOpen(true);
  };

  const closeModal = () => {
    setDocumentModalOpen(false);
    // Revoke the object URL to prevent memory leaks
    setCurrentDoc("");
  };

  const handleChange = (e) => {
    setStudentAgreement({
      ...studentAgreement,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
    setStudentAgreement({
      ...studentAgreement,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <>
      <div className="mb-10 animate-fade">
        <p className="text-sm text-gray-600 mb-4">
          Please review and accept the following agreements to complete your
          enrollment.
        </p>

        <div className="space-y-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={studentAgreement.agree}
              onChange={handleCheckbox}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <button
                onClick={() => openModal(studentApplicantAgreement)}
                className="text-green-600 font-medium hover:underline"
              >
                Student/Applicant Agreement
              </button>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="applicantAgreement"
              id="applicantAgreement"
              checked={studentAgreement.applicantAgreement}
              onChange={handleCheckbox}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <button
                onClick={() => openModal(studentAgreementdoc)}
                className="text-green-600 font-medium hover:underline"
              >
                Student Privacy Contract
              </button>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="toc"
              id="toc"
              checked={studentAgreement.toc}
              onChange={handleCheckbox}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <button
                onClick={() => openModal(TOCdoc)}
                className="text-green-600 font-medium hover:underline"
              >
                Terms and Conditions
              </button>
            </label>
          </div>

          {!studentAgreement.agree ||
          !studentAgreement.applicantAgreement ||
          !studentAgreement.toc ? (
            <p className="text-amber-600 text-xs mt-2">
              * You must agree to all terms to submit your application
            </p>
          ) : null}
        </div>
      </div>
      <DocumentModal
        isOpen={DocumentModalOpen}
        onClose={closeModal}
        docLink={currentDoc}
      />
    </>
  );
};

export default StudentAgreement;
