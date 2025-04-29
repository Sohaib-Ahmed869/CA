// sections/EmergencyContact.js
import React from "react";

const EmergencyContact = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      emergencyContact: {
        ...formData.emergencyContact,
        [name]: value,
      },
    });
  };

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Emergency Contact
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="block text-md font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.emergencyContact.fullName}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-md font-medium text-gray-700">
            Relationship
          </label>
          <input
            type="text"
            name="relationship"
            value={formData.emergencyContact.relationship}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-md font-medium text-gray-700">
            Home Phone
          </label>
          <input
            type="tel"
            name="homePhone"
            value={formData.emergencyContact.homePhone}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-md font-medium text-gray-700">
            Mobile Phone
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.emergencyContact.mobile}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <label className="block text-md font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.emergencyContact.address}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
