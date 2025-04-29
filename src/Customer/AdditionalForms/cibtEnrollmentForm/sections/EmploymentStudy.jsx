// sections/EmploymentStudy.js
import React from "react";

const EmploymentStudy = ({ formData, setFormData }) => {
  const handleEmploymentChange = (e) => {
    setFormData({
      ...formData,
      employmentStatus: e.target.value,
    });
  };

  const handleStudyReasonChange = (e) => {
    setFormData({
      ...formData,
      studyReason: e.target.value,
    });
  };

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Employment & Study Reason{" "}
        </h2>
      </div>
      {/* Employment Status */}
      <label className="block my-2 text-md font-medium text-gray-700">
        What best describes your current employment status?
      </label>
      <select
        value={formData.employmentStatus}
        onChange={handleEmploymentChange}
        className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
      >
        <option value="">Select</option>
        <option value="Full-time employee">Full-time employee</option>
        <option value="Part-time employee">Part-time employee</option>
        <option value="Self-employed – not employing others">
          Self-employed – not employing others
        </option>
        <option value="Self-employed – employing others">
          Self-employed – employing others
        </option>
        <option value="Employed – unpaid worker in a family business">
          Unpaid worker in a family business
        </option>
        <option value="Unemployed – seeking full-time work">
          Unemployed – seeking full-time work
        </option>
        <option value="Unemployed – seeking part-time work">
          Unemployed – seeking part-time work
        </option>
        <option value="Not employed – not seeking employment">
          Not employed – not seeking employment
        </option>
      </select>

      {/* Study Reason */}
      <label className="block my-2 text-md font-medium text-gray-700">
        What is your main reason for undertaking this course?
      </label>
      <select
        value={formData.studyReason}
        onChange={handleStudyReasonChange}
        className="rounded-md  border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
      >
        <option value="">Select</option>
        <option value="To get a job">To get a job</option>
        <option value="To develop my existing business">
          To develop my existing business
        </option>
        <option value="To start my own business">
          To start my own business
        </option>
        <option value="To try for a different career">
          To try for a different career
        </option>
        <option value="To get a better job or promotion">
          To get a better job or promotion
        </option>
        <option value="It was a requirement of my job">
          It was a requirement of my job
        </option>
        <option value="I wanted extra skills for my job">
          I wanted extra skills for my job
        </option>
        <option value="To get into another course of study">
          To get into another course of study
        </option>
        <option value="For personal interest or self-development">
          For personal interest or self-development
        </option>
        <option value="To get skills for community/voluntary work">
          To get skills for community/voluntary work
        </option>
        <option value="Other reasons">Other reasons</option>
      </select>
    </div>
  );
};

export default EmploymentStudy;
