import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// ======================
// Data Configuration
// ======================
const initialUnits = [
  {
    code: "CPCCCA2002",
    name: "Use carpentry tools and equipment",
    tasks: [
      "Review work instructions to use tools and equipment",
      "Plan all work to comply with laws and regulations, national construction codes, Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers’ specifications and workplace requirements. ",
      "Select and use personal protective equipment (PPE) for each part of the task. ",
      "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades. ",
      "Select equipment and hand, power and pneumatic tools for the carpentry task, identify their functions and operations, check for serviceability and report any faults.",
      "Use equipment and hand, power and pneumatic tools following WHS requirements and manufacturers’ recommendations.",
      "Sharpen and maintain tools",
      "Clean up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
      "Check, maintain, store and secure tools and equipment and report any faults",
    ],
  },
  {
    code: "CPCCCA2011",
    name: "Handle carpentry materials",
    tasks: [
      "Read and interpret work instructions and plan sequence of work. ",
      "Plan all work to comply with laws and regulations, work health and safety (WHS) and environmental requirements, manufacturers’ specifications and workplace requirements. ",
      "Select tools and equipment, check for serviceability and report any faults.",
      "Select and used personal protective equipment (PPE) for each part of the task. ",
      "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades. ",
      "Apply safe manual handling techniques to move carpentry materials to specified location.",
      "Sort carpentry materials to suit material type and size, and stack clear of access ways for ease of identification, retrieval, task sequence and task location.",
      "Protect carpentry materials against physical and water damage.",
      "Stack and secure carpentry materials for mechanical handling in accordance with the type of material and equipment to be used.",
      "Unload, move or locate carpentry materials at specified location. ",
      "Check, tools and equipment and report any faults.",
      "Store tools and equipment in accordance with workplace requirements.",
    ],
  },
  {
    code: "CPCCCA3001",
    name: " Carry out general demolition of minor building structures",
    tasks: [
      "Review and clarify task for demolition of minor building structures.",
      "Assess minor building structures to determine scope of demolition work.",
      "Review jurisdictional requirements for demolition of minor building structures. ",
      "Review work health and safety (WHS) requirements for the task in accordance with safety plans and policies.",
      "Identify and manage risks including determining the status of existing services. ",
      "Identify safety signage and barricade requirements. ",
      "Review environmental requirements for the task in accordance with environmental plans and legislative requirements.",
      "Select plant, tools and equipment, check for serviceability and rectify or report any faults. ",
      " Erect identified safety signage and barricades, and fit personal protective equipment (PPE). ",
      "Complete preparatory work for demolition of minor building structures. ",
      "Carry out demolition procedures in accordance with safe and effective processes of deconstructing or demolishing a minor building structure",
      "Safely and effectively handle materials and building component parts to designated storage area using appropriate material-handling techniques. ",
      "Safely and effectively handle, store and stack materials and components identified for salvaging, ready for transport.",
      "Clear work area and dispose of non-salvageable materials in accordance with legislation, regulations, codes of practice and task requirements. ",
      "Clean, check, maintain and store tools and equipment in accordance with manufacturers’ specifications and workplace requirements.",
    ],
  },
  {
    code: "CPCCCA3002",
    name: " ",
  },
  // Add remaining units here following the same structure
];

// ======================
// Utility Functions
// ======================
const initializeFormState = (units) => {
  return units.reduce((acc, unit) => {
    acc[unit.code] = unit.tasks.reduce((taskAcc, _, index) => {
      taskAcc[index] = { frequency: null, explanation: "" };
      return taskAcc;
    }, {});
    return acc;
  }, {});
};

// ======================
// Components
// ======================
const UnitComponent = ({ unit, formData, onFieldChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-emerald-800">
        {unit.code} - {unit.name}
      </h3>

      <div className="space-y-6">
        {unit.tasks.map((task, index) => (
          <div key={index} className="border-b pb-4">
            <div className="mb-2 font-medium text-gray-700">{task}</div>

            <div className="flex items-center gap-4 mb-3">
              {["often", "sometimes", "rarely"].map((frequency) => (
                <label key={frequency} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`${unit.code}-${index}`}
                    checked={formData[unit.code][index].frequency === frequency}
                    onChange={() =>
                      onFieldChange(unit.code, index, "frequency", frequency)
                    }
                    className="h-4 w-4 text-emerald-600"
                  />
                  {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                </label>
              ))}
            </div>

            <textarea
              placeholder="Additional comments or explanations..."
              value={formData[unit.code][index].explanation}
              onChange={(e) =>
                onFieldChange(unit.code, index, "explanation", e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
              rows="2"
            />
          </div>
        ))}
      </div>

      <ThirdPartyDeclaration />
    </div>
  );
};

const ThirdPartyDeclaration = () => (
  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
    <h4 className="text-lg font-semibold mb-4 text-emerald-800">
      Third Party Declaration
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Name of person completing this form"
        className="p-2 border rounded focus:ring-emerald-500"
      />
      <input
        type="text"
        placeholder="Relationship to candidate"
        className="p-2 border rounded focus:ring-emerald-500"
      />
      <input
        type="email"
        placeholder="Email address"
        className="p-2 border rounded focus:ring-emerald-500"
      />
      <input
        type="tel"
        placeholder="Contact number"
        className="p-2 border rounded focus:ring-emerald-500"
      />
      <div className="md:col-span-2">
        <label className="block mb-2">
          <input type="checkbox" className="mr-2" />I confirm the information
          provided is accurate and truthful
        </label>
      </div>
    </div>
  </div>
);

// ======================
// Main Component
// ======================
const ThirdPartyEvidenceKit = () => {
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const [formData, setFormData] = useState(() =>
    initializeFormState(initialUnits)
  );

  const handleFieldChange = (unitCode, taskIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [unitCode]: {
        ...prev[unitCode],
        [taskIndex]: {
          ...prev[unitCode][taskIndex],
          [field]: value,
        },
      },
    }));
  };

  const handleNavigation = (direction) => {
    setCurrentUnitIndex((prev) =>
      direction === "next"
        ? Math.min(prev + 1, initialUnits.length - 1)
        : Math.max(prev - 1, 0)
    );
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    // Add submission logic here
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            RPL Third Party Evidence Kit
          </h1>
          <h2 className="text-2xl text-emerald-700">
            CPC30220 - Certificate III in Carpentry
          </h2>
        </header>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              onClick={() => handleNavigation("prev")}
              disabled={currentUnitIndex === 0}
              className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
            >
              <BsChevronLeft className="mr-2" /> Previous Unit
            </button>

            <span className="text-gray-600">
              Unit {currentUnitIndex + 1} of {initialUnits.length}
            </span>

            <button
              type="button"
              onClick={() => handleNavigation("next")}
              disabled={currentUnitIndex === initialUnits.length - 1}
              className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
            >
              Next Unit <BsChevronRight className="ml-2" />
            </button>
          </div>

          <UnitComponent
            unit={initialUnits[currentUnitIndex]}
            formData={formData}
            onFieldChange={handleFieldChange}
          />

          {currentUnitIndex === initialUnits.length - 1 && (
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Submit All Evidence
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyEvidenceKit;
