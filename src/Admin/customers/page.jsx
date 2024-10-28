import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { Table } from "flowbite-react";

import customerspic from "../../assets/customers.png";

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

  if (
    document.getElementById("default-table") &&
    typeof simpleDatatables.DataTable !== "undefined"
  ) {
    const dataTable = new simpleDatatables.DataTable("#default-table", {
      searchable: false,
      perPageSelect: false,
    });
  }

  return (
    <div className="flex flex-col p-5 w-full justify-between animate-fade">
      <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
        <img src={customerspic} alt="Dashboard" className="h-36" />
        <div className="flex flex-col lg:w-1/2 w-full">
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-sm mt-2">
            Welcome to the customers page. Here you can view all the customers
            and their details.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-5">
        <div className="flex flex-col">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            value={search}
            className="input mt-2 border-2 border-base-300"
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 max-sm:flex-col">
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
      <div className="flex flex-col border border-base-300 rounded-lg shadow-lg p-2 lg:p-5 overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Customer ID</Table.HeadCell>
            <Table.HeadCell className="max-sm:hidden"></Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell className="max-sm:hidden">Industry</Table.HeadCell>
            <Table.HeadCell className="max-sm:hidden">Email</Table.HeadCell>
            <Table.HeadCell className="max-sm:hidden">Phone</Table.HeadCell>
            <Table.HeadCell className="max-sm:hidden">Country</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredCustomers.map((customer, index) => (
              <Table.Row key={index} className="hover:bg-gray-100">
                <Table.Cell className="p-2">{index + 1}</Table.Cell>
                <Table.Cell className="max-sm:hidden">
                  {customer.verified && (
                    <GoVerified className="text-primary mr-2" />
                  )}
                </Table.Cell>
                <Table.Cell>
                  {customer.firstName} {customer.lastName}
                </Table.Cell>
                <Table.Cell className="max-sm:hidden">
                  {customer.industry}
                </Table.Cell>
                <Table.Cell className="max-sm:hidden">
                  {customer.email}
                </Table.Cell>
                <Table.Cell className="max-sm:hidden">
                  {customer.phone}
                </Table.Cell>
                <Table.Cell className="max-sm:hidden">
                  {customer.country}
                </Table.Cell>
                <Table.Cell>
                  <button
                    className="btn-sm flex items-center gap-2"
                    onClick={() => showDetails(customer)}
                  >
                    <IoEye className="text-lg" />
                    <span className="max-sm:hidden">View Details</span>
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
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
