// sections/StudentDeclaration.js
import React from "react";

const StudentDeclaration = ({ formData, setFormData }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      declarations: {
        ...formData.declarations,
        [name]: checked,
      },
    });
  };

  const handleSignatureChange = (e) => {
    setFormData({
      ...formData,
      signature: e.target.value,
    });
  };

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Student Declaration
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="privacyAcknowledged"
            checked={formData.declarations.privacyAcknowledged}
            onChange={handleCheckboxChange}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label className="text-md text-gray-700">
            I acknowledge that I have read the VET Student Enrolment Privacy
            Notice
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="consentGiven"
            checked={formData.declarations.consentGiven}
            onChange={handleCheckboxChange}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label className="text-md text-gray-700">
            I consent to the collection, use and disclosure of my personal
            information
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="declarationSigned"
            checked={formData.declarations.declarationSigned}
            onChange={handleCheckboxChange}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label className="text-md text-gray-700">
            I declare that the information provided is true and correct
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="block text-md font-medium text-gray-700">
              Signature
            </label>
            <input
              type="text"
              value={formData.signature}
              onChange={handleSignatureChange}
              className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
              placeholder="Type your full name as signature"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-md font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDeclaration;
