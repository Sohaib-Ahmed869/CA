// sections/PersonalDetails.js
import React from "react";
import PhoneInput from "react-phone-input-2";

const PersonalDetails = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personalDetails: {
        ...formData.personalDetails,
        [name]: value,
      },
    });
  };

  const handlePhoneChange = (value, country, event, formattedValue) => {
    setFormData({
      ...formData,
      personalDetails: {
        ...formData.personalDetails,
        contacts: {
          ...formData.personalDetails.contacts,
          mobile: value, // or 'mobile' if this is for mobile phone
        },
      },
    });
  };
  const handleHomePhoneChange = (value, country, event, formattedValue) => {
    setFormData({
      ...formData,
      personalDetails: {
        ...formData.personalDetails,
        contacts: {
          ...formData.personalDetails.contacts,
          home: value, // or 'mobile' if this is for mobile phone
        },
      },
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personalDetails: {
        ...formData.personalDetails,
        contacts: {
          ...formData.personalDetails.contacts,
          [name]: value,
        },
      },
    });
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personalDetails: {
        ...formData.personalDetails,
        address: {
          ...formData.personalDetails.address,
          [name]: value,
        },
      },
    });
  };

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Personal Details
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Fields */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="familyname"
            className="block text-md font-medium text-gray-700"
          >
            Family Name
          </label>
          <input
            type="text"
            name="familyName"
            value={formData.personalDetails.familyName}
            onChange={handleChange}
            placeholder="Family Name"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="Given Name"
            className="block text-md font-medium text-gray-700"
          >
            Given Name
          </label>
          <input
            type="text"
            name="givenName"
            value={formData.personalDetails.givenName}
            onChange={handleChange}
            placeholder="Given Name"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="familyname"
            className="block text-md font-medium text-gray-700"
          >
            Middle Name
          </label>
          <input
            type="text"
            name="middleName"
            value={formData.personalDetails.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>

        {/* DOB & Gender */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="dob"
            className="block text-md font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.personalDetails.dob}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="gender"
            className="block text-md font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            name="gender"
            value={formData.personalDetails.gender}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      {/* Contact Info */}
      <div className="flex items-center mb-6 border-b mt-8 pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Contact Information
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="home"
            className="block text-md font-medium text-gray-700"
          >
            Home Phone
          </label>
          <div className="phone-input-container">
            <PhoneInput
              country={"au"}
              value={formData.personalDetails.contacts.home}
              onChange={handleHomePhoneChange} // Use the new handler here
              inputClass="w-full h-11 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              containerClass="w-full"
              buttonStyle={{
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem 0 0 0.375rem",
                backgroundColor: "#f9fafb",
              }}
              dropdownStyle={{
                width: "300px",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="mobile"
            className="block text-md font-medium text-gray-700"
          >
            {" "}
            Mobile Phone
          </label>
          <div className="phone-input-container">
            <PhoneInput
              country={"au"}
              value={formData.personalDetails.contacts.mobile}
              onChange={handlePhoneChange} // Use the new handler here
              inputClass="w-full h-11 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              containerClass="w-full"
              buttonStyle={{
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem 0 0 0.375rem",
                backgroundColor: "#f9fafb",
              }}
              dropdownStyle={{
                width: "300px",
              }}
            />
          </div>
          {/* <input
            type="number"
            name="mobile"
            value={formData.personalDetails.contacts.mobile}
            onChange={handleContactChange}
            placeholder="Mobile Phone"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          /> */}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="block text-md font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.personalDetails.contacts.email}
            onChange={handleContactChange}
            placeholder="Email"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="altEmail"
            className="block text-md font-medium text-gray-700"
          >
            {" "}
            Alternative Email
          </label>
          <input
            type="email"
            name="altEmail"
            value={formData.personalDetails.contacts.altEmail}
            onChange={handleContactChange}
            placeholder="Alternative Email"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
      </div>
      {/* Address Info */}
      <div className="flex items-center mb-6 border-b mt-8 pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Residential Address{" "}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="building"
            className="block text-md font-medium text-gray-700"
          >
            {" "}
            Building / Property Name
          </label>

          <input
            type="text"
            name="building"
            value={formData.personalDetails.address.building}
            onChange={handleAddressChange}
            placeholder="Building / Property Name"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="unit"
            className="block text-md font-medium text-gray-700"
          >
            {" "}
            Flat / Unit
          </label>
          <input
            type="text"
            name="unit"
            value={formData.personalDetails.address.unit}
            onChange={handleAddressChange}
            placeholder="Flat / Unit"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="street"
            className="block text-md font-medium text-gray-700"
          >
            {" "}
            Street
          </label>

          <input
            type="text"
            name="street"
            value={formData.personalDetails.address.street}
            onChange={handleAddressChange}
            placeholder="Street Name"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="suburb"
            className="block text-md font-medium text-gray-700"
          >
            {" "}
            Suburb
          </label>

          <input
            type="text"
            name="suburb"
            value={formData.personalDetails.address.suburb}
            onChange={handleAddressChange}
            placeholder="Suburb / Locality / Town"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="state"
            className="block text-md font-medium text-gray-700"
          >
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.personalDetails.address.state}
            onChange={handleAddressChange}
            placeholder="State / Territory"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="POSTCODE"
            className="block text-md font-medium text-gray-700"
          >
            Postcode
          </label>
          <input
            type="text"
            name="postcode"
            value={formData.personalDetails.address.postcode}
            onChange={handleAddressChange}
            placeholder="Postcode"
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
