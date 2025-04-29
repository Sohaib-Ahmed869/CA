import React, { useState } from "react";
import Navbar from "../../components/navbar";
import logo from "../../../assets/cibt-logo.png";

const EntryInterviewForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    phone: "",
    email: "",
    selectedCourses: [],
    courseGoals: "",
    careerGoals: "",
    previousCourses: "",
    relatedExperience: "",
    learningStyles: [],
    learningStyleOther: "",
    learningStrategies: {
      textbooks: false,
      powerPoints: false,
      diagrams: false,
      groupDiscussion: false,
      onlineMaterials: false,
      ownResearch: false,
      practicalApplication: false,
      caseStudy: false,
      learningOther: "",
    },
    supportNeeds: {
      english: false,
      reading: false,
      writing: false,
      study: false,
      oneOnOne: false,
      resources: false,
      supportOther: "",
    },
    workingInIndustry: "",
    workplaceName: "",
    supervisorName: "",
    employerSupport: "",
    priorIndustryExperience: "",
    rplApplication: "",
    additionalInfo: "",
    creditTransfer: "",
    digitalLiteracy: {
      computerAccess: "",
      frequency: "",
      skills: {
        powerOn: "",
        sendEmail: "",
        browseWeb: "",
        manageFiles: "",
        searchInfo: "",
        attachDocs: "",
        organizeEmail: "",
        loginSystems: "",
      },
      socialMediaUse: "",
    },
    outcome: {
      suitability: "",
      suitableCourse: "",
      deliveryMode: "",
      reasons: "",
      additionalSupport: "",
      digitalReady: "",
      comments: "",
    },
    studentSignature: "",
    signatureDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleCheckboxGroupChange = (section, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: !prev[section][field] },
    }));
  };

  const handleArrayCheckboxChange = (field, value) => {
    setFormData((prev) => {
      const arr = [...(prev[field] || [])];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...arr, value] };
      }
    });
  };

  // Helper function to create section headers
  const SectionHeader = ({ title }) => (
    <div className="flex items-center mb-6 border-b pb-2 mt-8">
      <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
      <h2 className="text-2xl font-semibold text-green-700">{title}</h2>
    </div>
  );

  // Helper function for form field groups
  const FormField = ({ label, children, className = "" }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="block text-md font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="space-y-6 p-6 w-full md:w-2/3 m-auto bg-white shadow-lg my-20">
      <Navbar />
      <div className="text-center mb-6">
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-32 " />

        <h1 className="text-3xl font-medium font-outfit text-emerald-800 mb-2">
          Cove Institute of Business & Trade
        </h1>
        <h2 className="text-2xl font-medium text-emerald-700">
          Course Entry Interview Form
        </h2>
        <p className="text-sm text-gray-500">RTO NO: 45665</p>
      </div>
      <SectionHeader title="Student/Applicant Details" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Full Name">
          <input
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </FormField>

        <FormField label="Date of Birth">
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </FormField>

        <FormField label="Phone Number">
          <input
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </FormField>

        <FormField label="Email Address">
          <input
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </FormField>
      </div>

      <SectionHeader title="Course Selection" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 p-4 border border-gray-200 rounded-md bg-gray-50">
          <p className="mb-3 font-medium text-gray-700">
            Select course(s) you're interested in:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "BSB40820-Certificate IV in Marketing and Communication",
              "FNS40222-Certificate IV in Accounting and Bookkeeping",
              "CPC30220-Certificate III in Carpentry",
              "CPC30620-Certificate III in Painting and Decorating",
              "CPC31220-Certificate III in Wall and Ceiling Lining",
              "CPC31320-Certificate III in Wall and Floor Tiling",
              "CPC40120-Certificate IV in Building and Construction",
              "CPC50220-Diploma of Building and Construction (Building)",
            ].map((course) => (
              <label
                key={course}
                className="flex items-center space-x-2 hover:bg-white p-2 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  checked={formData.selectedCourses.includes(course)}
                  onChange={() =>
                    handleArrayCheckboxChange("selectedCourses", course)
                  }
                />
                <span>{course}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <SectionHeader title="Educational Goals" />

      <div className="grid grid-cols-1 gap-4">
        <FormField label="What do you hope to gain from the course(s)?">
          <textarea
            name="courseGoals"
            placeholder="Describe your goals for taking this course..."
            value={formData.courseGoals}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2 min-h-[100px]"
          />
        </FormField>

        <FormField label="What are your career goals?">
          <textarea
            name="careerGoals"
            placeholder="Describe your career aspirations..."
            value={formData.careerGoals}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2 min-h-[100px]"
          />
        </FormField>

        <FormField label="Previous courses and what you enjoyed about them">
          <textarea
            name="previousCourses"
            placeholder="List any previous relevant courses and what aspects you enjoyed..."
            value={formData.previousCourses}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2 min-h-[100px]"
          />
        </FormField>

        <FormField label="Any related experience you have in this field">
          <textarea
            name="relatedExperience"
            placeholder="Describe any relevant experience you have..."
            value={formData.relatedExperience}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2 min-h-[100px]"
          />
        </FormField>
      </div>

      <SectionHeader title="Learning Preferences" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg mb-3 text-green-700">
            Learning Style
          </h3>
          <div className="space-y-2">
            {["Visual", "Hands on", "Reading"].map((style) => (
              <label
                key={style}
                className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  checked={formData.learningStyles.includes(style)}
                  onChange={() =>
                    handleArrayCheckboxChange("learningStyles", style)
                  }
                />
                <span>{style}</span>
              </label>
            ))}
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other (please specify)
              </label>
              <input
                name="learningStyleOther"
                placeholder="Other learning style..."
                value={formData.learningStyleOther}
                onChange={handleInputChange}
                className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg mb-3 text-green-700">
            Learning Strategies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.keys(formData.learningStrategies)
              .filter((strategy) => strategy !== "learningOther")
              .map((strategy) => (
                <label
                  key={strategy}
                  className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    checked={formData.learningStrategies[strategy]}
                    onChange={() =>
                      handleCheckboxGroupChange("learningStrategies", strategy)
                    }
                  />
                  <span className="capitalize">{strategy}</span>
                </label>
              ))}
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other (please specify)
            </label>
            <input
              placeholder="Other learning strategy..."
              value={formData.learningStrategies.learningOther}
              onChange={(e) =>
                handleNestedChange(
                  "learningStrategies",
                  "learningOther",
                  e.target.value
                )
              }
              className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
            />
          </div>
        </div>
      </div>

      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="font-medium text-lg mb-3 text-green-700">
          Support Needs
        </h3>
        <p className="mb-3 text-sm text-gray-600">
          Please indicate if you require support in any of the following areas:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {Object.keys(formData.supportNeeds)
            .filter((support) => support !== "supportOther")
            .map((support) => (
              <label
                key={support}
                className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  checked={formData.supportNeeds[support]}
                  onChange={() =>
                    handleCheckboxGroupChange("supportNeeds", support)
                  }
                />
                <span className="capitalize">{support}</span>
              </label>
            ))}
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Other support needs (please specify)
          </label>
          <input
            placeholder="Other support needs..."
            value={formData.supportNeeds.supportOther}
            onChange={(e) =>
              handleNestedChange("supportNeeds", "supportOther", e.target.value)
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </div>
      </div>

      <SectionHeader title="Industry Experience and Recognition" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Are you currently working in the industry?">
          <select
            name="workingInIndustry"
            value={formData.workingInIndustry}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </FormField>

        <FormField label="Workplace Name">
          <input
            name="workplaceName"
            placeholder="Enter your workplace name"
            value={formData.workplaceName}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </FormField>

        <FormField label="Supervisor's Name">
          <input
            name="supervisorName"
            placeholder="Enter your supervisor's name"
            value={formData.supervisorName}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </FormField>

        <FormField label="Does your employer support this training?">
          <select
            name="employerSupport"
            value={formData.employerSupport}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="N/A">Not Applicable</option>
          </select>
        </FormField>

        <FormField
          label="Describe your prior industry experience"
          className="md:col-span-2"
        >
          <textarea
            name="priorIndustryExperience"
            placeholder="Describe any prior experience you have in this industry..."
            value={formData.priorIndustryExperience}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2 min-h-[100px]"
          />
        </FormField>

        <FormField label="Are you applying for Recognition of Prior Learning (RPL)?">
          <select
            name="rplApplication"
            value={formData.rplApplication}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </FormField>

        <FormField label="Are you applying for Credit Transfer?">
          <select
            name="creditTransfer"
            value={formData.creditTransfer}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </FormField>

        <FormField label="Additional Information" className="md:col-span-2">
          <textarea
            name="additionalInfo"
            placeholder="Any additional information you'd like to provide..."
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2 min-h-[100px]"
          />
        </FormField>
      </div>

      <SectionHeader title="Digital Literacy Assessment" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Do you have access to a computer?">
          <select
            value={formData.digitalLiteracy.computerAccess}
            onChange={(e) =>
              handleNestedChange(
                "digitalLiteracy",
                "computerAccess",
                e.target.value
              )
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </FormField>

        <FormField label="How often do you use a computer?">
          <select
            value={formData.digitalLiteracy.frequency}
            onChange={(e) =>
              handleNestedChange("digitalLiteracy", "frequency", e.target.value)
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          >
            <option value="">Select</option>
            <option value="Daily">Daily</option>
            <option value="Several times a week">Several times a week</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Rarely">Rarely</option>
            <option value="Never">Never</option>
          </select>
        </FormField>
      </div>

      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="font-medium text-lg mb-3 text-green-700">
          Computer Skills Assessment
        </h3>
        <p className="mb-3 text-sm text-gray-600">
          For each skill, please indicate your level of confidence:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData.digitalLiteracy.skills).map((skill) => (
            <FormField
              key={skill}
              label={
                skill.charAt(0).toUpperCase() +
                skill.slice(1).replace(/([A-Z])/g, " $1")
              }
            >
              <select
                value={formData.digitalLiteracy.skills[skill]}
                onChange={(e) =>
                  handleNestedChange("digitalLiteracy", "skills", {
                    ...formData.digitalLiteracy.skills,
                    [skill]: e.target.value,
                  })
                }
                className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
              >
                <option value="">Select</option>
                <option value="Very confident">Very confident</option>
                <option value="Confident">Confident</option>
                <option value="Somewhat confident">Somewhat confident</option>
                <option value="Not confident">Not confident</option>
                <option value="Cannot do this">Cannot do this</option>
              </select>
            </FormField>
          ))}
        </div>

        <FormField
          label="How frequently do you use social media?"
          className="mt-4"
        >
          <select
            value={formData.digitalLiteracy.socialMediaUse}
            onChange={(e) =>
              handleNestedChange(
                "digitalLiteracy",
                "socialMediaUse",
                e.target.value
              )
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          >
            <option value="">Select</option>
            <option value="Multiple times daily">Multiple times daily</option>
            <option value="Daily">Daily</option>
            <option value="Several times a week">Several times a week</option>
            <option value="Weekly">Weekly</option>
            <option value="Rarely">Rarely</option>
            <option value="Never">Never</option>
          </select>
        </FormField>
      </div>

      <SectionHeader title="Outcome (Office Use Only)" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-md bg-gray-50">
        <FormField label="Is the student suitable for the course?">
          <select
            value={formData.outcome.suitability}
            onChange={(e) =>
              handleNestedChange("outcome", "suitability", e.target.value)
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </FormField>

        <FormField label="Suitable Course">
          <input
            placeholder="Indicate suitable course"
            value={formData.outcome.suitableCourse}
            onChange={(e) =>
              handleNestedChange("outcome", "suitableCourse", e.target.value)
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </FormField>

        <FormField label="Recommended Delivery Mode">
          <input
            placeholder="Recommended delivery mode"
            value={formData.outcome.deliveryMode}
            onChange={(e) =>
              handleNestedChange("outcome", "deliveryMode", e.target.value)
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </FormField>

        <FormField label="Is the student digital-ready?">
          <select
            value={formData.outcome.digitalReady}
            onChange={(e) =>
              handleNestedChange("outcome", "digitalReady", e.target.value)
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </FormField>

        <FormField
          label="Reasons for Suitability Assessment"
          className="md:col-span-2"
        >
          <textarea
            placeholder="Provide reasons for your assessment..."
            value={formData.outcome.reasons}
            onChange={(e) =>
              handleNestedChange("outcome", "reasons", e.target.value)
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2 min-h-[100px]"
          />
        </FormField>

        <FormField
          label="Additional Support Recommended"
          className="md:col-span-2"
        >
          <textarea
            placeholder="Detail any additional support recommendations..."
            value={formData.outcome.additionalSupport}
            onChange={(e) =>
              handleNestedChange("outcome", "additionalSupport", e.target.value)
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2 min-h-[100px]"
          />
        </FormField>

        <FormField label="Other Comments" className="md:col-span-2">
          <textarea
            placeholder="Any other comments..."
            value={formData.outcome.comments}
            onChange={(e) =>
              handleNestedChange("outcome", "comments", e.target.value)
            }
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2 min-h-[100px]"
          />
        </FormField>
      </div>

      <SectionHeader title="Declaration" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Student Signature">
          <input
            name="studentSignature"
            placeholder="Type your full name as signature"
            value={formData.studentSignature}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </FormField>

        <FormField label="Date">
          <input
            name="signatureDate"
            type="date"
            value={formData.signatureDate}
            onChange={handleInputChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 p-2"
          />
        </FormField>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md shadow transition duration-300"
        >
          Submit Form
        </button>
      </div>
    </div>
  );
};

export default EntryInterviewForm;
