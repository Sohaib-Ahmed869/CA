import React, { useState, useEffect } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";

const CreditsTransfer = ({ creditsTransfer, setCreditsTransfer }) => {
  const [errors, setErrors] = useState({});
  const [showAdditionalFields, setShowAdditionalFields] = useState(
    creditsTransfer.creditsTransfer === "Yes"
  );

  // Update visibility of additional fields when credit transfer status changes
  useEffect(() => {
    setShowAdditionalFields(creditsTransfer.creditsTransfer === "Yes");
  }, [creditsTransfer.creditsTransfer]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "YearCompleted":
        if (value) {
          const yearValue = parseInt(value);
          const currentYear = new Date().getFullYear();
          if (isNaN(yearValue) || yearValue < 1900 || yearValue > currentYear) {
            error = `Please enter a valid year between 1900 and ${currentYear}`;
          }
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the field
    const error = validateField(name, value);

    // Update errors state
    setErrors({
      ...errors,
      [name]: error,
    });

    // Clear related fields if credit transfer status changes to "No"
    if (name === "creditsTransfer" && value === "No") {
      setCreditsTransfer({
        ...creditsTransfer,
        [name]: value,
        nameOfQualification: "",
        YearCompleted: "",
      });
    } else {
      setCreditsTransfer({ ...creditsTransfer, [name]: value });
    }
  };

  return (
    <div className="mb-10 animate-fade">
      <h2 className="text-2xl font-semibold mb-5 text-green-700">
        Credits Transfer
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        If you have completed relevant prior study, you may be eligible for
        credit transfer.
      </p>

      <div className="flex flex-col space-y-1 mb-5">
        <label htmlFor="creditsTransfer" className="text-sm text-gray-600">
          Do you have credits to transfer?
        </label>
        <select
          name="creditsTransfer"
          id="creditsTransfer"
          className="input p-2 mt-2 border rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={creditsTransfer.creditsTransfer}
          onChange={handleChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      {showAdditionalFields && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-1">
            <FloatingLabelInput
              name="nameOfQualification"
              type="text"
              id="nameOfQualification"
              label="Name of Qualification"
              value={creditsTransfer.nameOfQualification}
              onChange={handleChange}
              required={showAdditionalFields}
            />
          </div>

          <div className="space-y-1">
            <FloatingLabelInput
              name="YearCompleted"
              type="text"
              id="YearCompleted"
              label="Year Completed"
              value={creditsTransfer.YearCompleted}
              onChange={(e) => {
                // Allow only numbers
                const value = e.target.value.replace(/[^\d]/g, "");
                e.target.value = value;
                handleChange(e);
              }}
              required={showAdditionalFields}
              maxLength={4}
              className={errors.YearCompleted ? "border-red-500" : ""}
            />
            {errors.YearCompleted && (
              <p className="text-red-500 text-xs">{errors.YearCompleted}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditsTransfer;
