import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { IoEye } from "react-icons/io5";

const customers = [
  {
    industry: "Technology",
    qualification: "Bachelor's in Computer Science",
    yearsOfExperience: 5,
    locationOfExperience: "Silicon Valley",
    state: "California",
    formalEducation: true,
    formalEducationAnswer: "Yes, attended Stanford University",
    firstName: "Alice",
    lastName: "Smith",
    phone: "+1-123-456-7890",
    email: "alice.smith@example.com",
    country: "United States",
    verified: true,
  },
  {
    industry: "Finance",
    qualification: "Master's in Finance",
    yearsOfExperience: 7,
    locationOfExperience: "New York City",
    state: "New York",
    formalEducation: true,
    formalEducationAnswer: "Yes, graduated from NYU",
    firstName: "Bob",
    lastName: "Johnson",
    phone: "+1-234-567-8901",
    email: "bob.johnson@example.com",
    country: "United States",
    verified: false,
  },
  {
    industry: "Healthcare",
    qualification: "Doctorate in Medicine",
    yearsOfExperience: 10,
    locationOfExperience: "Houston",
    state: "Texas",
    formalEducation: true,
    formalEducationAnswer: "Yes, graduated from Baylor College of Medicine",
    firstName: "Charlie",
    lastName: "Brown",
    phone: "+1-345-678-9012",
    email: "charlie.brown@example.com",
    country: "United States",
    verified: true,
  },
  {
    industry: "Engineering",
    qualification: "Bachelor's in Mechanical Engineering",
    yearsOfExperience: 3,
    locationOfExperience: "Detroit",
    state: "Michigan",
    formalEducation: true,
    formalEducationAnswer: "Yes, attended University of Michigan",
    firstName: "David",
    lastName: "Miller",
    phone: "+1-456-789-0123",
    email: "david.miller@example.com",
    country: "United States",
    verified: false,
  },
  {
    industry: "Education",
    qualification: "Master's in Education",
    yearsOfExperience: 8,
    locationOfExperience: "Boston",
    state: "Massachusetts",
    formalEducation: true,
    formalEducationAnswer: "Yes, graduated from Harvard University",
    firstName: "Emma",
    lastName: "Wilson",
    phone: "+1-567-890-1234",
    email: "emma.wilson@example.com",
    country: "United States",
    verified: true,
  },
  {
    industry: "Hospitality",
    qualification: "Diploma in Hospitality Management",
    yearsOfExperience: 6,
    locationOfExperience: "Orlando",
    state: "Florida",
    formalEducation: false,
    formalEducationAnswer: "No, completed training on the job",
    firstName: "Frank",
    lastName: "Anderson",
    phone: "+1-678-901-2345",
    email: "frank.anderson@example.com",
    country: "United States",
    verified: true,
  },
  {
    industry: "Law",
    qualification: "Juris Doctor",
    yearsOfExperience: 12,
    locationOfExperience: "Los Angeles",
    state: "California",
    formalEducation: true,
    formalEducationAnswer: "Yes, graduated from UCLA",
    firstName: "Grace",
    lastName: "Taylor",
    phone: "+1-789-012-3456",
    email: "grace.taylor@example.com",
    country: "United States",
    verified: false,
  },
  {
    industry: "Retail",
    qualification: "Bachelor's in Business Administration",
    yearsOfExperience: 4,
    locationOfExperience: "Chicago",
    state: "Illinois",
    formalEducation: true,
    formalEducationAnswer: "Yes, attended University of Illinois",
    firstName: "Henry",
    lastName: "Thomas",
    phone: "+1-890-123-4567",
    email: "henry.thomas@example.com",
    country: "United States",
    verified: true,
  },
  {
    industry: "Real Estate",
    qualification: "Real Estate License",
    yearsOfExperience: 15,
    locationOfExperience: "Miami",
    state: "Florida",
    formalEducation: false,
    formalEducationAnswer: "No, completed certification courses",
    firstName: "Isabella",
    lastName: "Lee",
    phone: "+1-901-234-5678",
    email: "isabella.lee@example.com",
    country: "United States",
    verified: true,
  },
  {
    industry: "Media",
    qualification: "Bachelor's in Journalism",
    yearsOfExperience: 9,
    locationOfExperience: "Washington D.C.",
    state: "District of Columbia",
    formalEducation: true,
    formalEducationAnswer: "Yes, graduated from Georgetown University",
    firstName: "Jack",
    lastName: "Martinez",
    phone: "+1-012-345-6789",
    email: "jack.martinez@example.com",
    country: "United States",
    verified: false,
  },
];

const CustomersInfo = () => {
  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    setFilteredCustomers(
      customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const [showModel, setShowModel] = useState(false);

  const showDetails = (customer) => {
    setCustomer(customer);
    setShowModel(true);
  };

  const showVerifiedOnly = () => {
    setFilteredCustomers(customers.filter((customer) => customer.verified));
  };

  const showUnverifiedOnly = () => {
    setFilteredCustomers(customers.filter((customer) => !customer.verified));
  };

  const showAll = () => {
    setFilteredCustomers(customers);
  };
  return (
    <div className="flex flex-col p-10 w-full justify-between animate-fade">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex flex-col w-1/2">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            value={search}
            className="input mt-2"
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="btn btn-primary btn-sm text-white"
            onClick={showVerifiedOnly}
          >
            Show Verified Only
          </button>
          <button
            className="btn bg-red-600 text-white btn-sm"
            onClick={showUnverifiedOnly}
          >
            Show Unverified Only
          </button>
          <button className="btn btn-sm" onClick={showAll}>
            Show All
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full border border-base-300 rounded-lg overflow-hidden shadow-lg p-5">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-200 text-gray-600 text-sm p-3 font-semibold rounded-lg">
            <tr className="bg-gray-200 text-gray-600 text-sm p-3 font-semibold rounded-lg">
              <th className="text-left p-3">Customer ID</th>
              <th></th>
              <th className="text-left">Name</th>
              <th className="text-left">Industry</th>
              <th className="text-left">Email</th>
              <th className="text-left">Phone</th>
              <th className="text-left">Country</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr
                key={index}
                className="border-b border-base-300 hover:bg-gray-400 hover:bg-opacity-15"
              >
                <td>{index + 1}</td>
                <td>
                  {customer.verified && (
                    <GoVerified className="text-primary mr-2" />
                  )}
                </td>
                <td className="flex items-center">
                  {customer.firstName} {customer.lastName}
                </td>

                <td>{customer.industry}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.country}</td>
                <td>
                  <button
                    className="btn-sm flex items-center gap-2"
                    onClick={() => showDetails(customer)}
                  >
                    <IoEye className="text-lg" />
                    View Details
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModel && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Customer Details</h2>
            <p>
              Name: {customer.firstName} {customer.lastName}
            </p>
            <p>Industry: {customer.industry}</p>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Country: {customer.country}</p>
            <p>Qualification: {customer.qualification}</p>
            <button
              className="btn btn-secondary mt-4"
              onClick={() => setShowModel(false)}
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CustomersInfo;
