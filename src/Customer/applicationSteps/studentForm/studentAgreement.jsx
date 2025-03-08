import React from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";
import studentAgreementdoc from "../../../assets/1.pdf";
import studentApplicantAgreement from "../../../assets/2.pdf";
import TOCdoc from "../../../assets/3.pdf";

const StudentAgreement = ({ studentAgreement, setStudentAgreement }) => {
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
            <a
              href={studentApplicantAgreement}
              target="_blank"
              rel="noreferrer"
              className="text-green-600 font-medium hover:underline"
            >
              Student/Applicant Agreement
            </a>
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
            <a
              href={studentAgreementdoc}
              target="_blank"
              rel="noreferrer"
              className="text-green-600 font-medium hover:underline"
            >
              Student Privacy Contract
            </a>
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
            <a
              href={TOCdoc}
              target="_blank"
              rel="noreferrer"
              className="text-green-600 font-medium hover:underline"
            >
              Terms and Conditions
            </a>
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
  );
};

export default StudentAgreement;
