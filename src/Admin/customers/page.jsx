import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { Table } from "flowbite-react";
import { getCustomers as fetchCustomers } from "../../Customer/Services/adminServices"; // Avoids naming conflict
import customerspic from "../../assets/customers.png";
import { verifyCustomer } from "../../Customer/Services/adminServices";

const CustomersInfo = () => {
  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [filter, setFilter] = useState("unverified");

  // Fetch customers on component mount
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const customersData = await fetchCustomers();
        setFilteredCustomers(customersData); // Set initial customer data
        setCustomers(customersData); // Set initial customer data
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    getCustomers();
  }, []);

  // Update customers based on search
  useEffect(() => {
    if (search) {
      const filtered = customers.filter((customer) =>
        customer.firstName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [search, customers]);

  // Show customer details modal
  const showDetails = (customer) => {
    setCustomer(customer);
    setShowModel(true);
  };

  const verify = async (customerId) => {
    try {
      await verifyCustomer(customerId);

      // Update the customer list after verification
      const updatedCustomers = customers.map((customer) => {
        if (customer.id === customerId) {
          return { ...customer, verified: true };
        }
        return customer;
      });

      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    } catch (error) {
      console.error("Failed to verify customer:", error);
    }
  };

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
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 w-full">
          <button
            className={`btn bg-gray-300 btn-sm rounded-xl text-black ${
              filter === "verified" ? "btn-primary bg-primary text-white" : ""
            }`}
            onClick={() => setFilter("verified")}
          >
            Show Verified Only
          </button>
          <button
            className={`btn bg-gray-300 btn-sm text-black ${
              filter === "unverified" ? "btn-primary bg-primary text-white" : ""
            }`}
            onClick={() => setFilter("unverified")}
          >
            Show Unverified Only
          </button>
          <button
            className={`btn bg-gray-300 btn-sm text-black ${
              filter === "all" ? "btn-primary bg-primary text-white" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            Show All
          </button>
        </div>
      </div>
      <div className="flex flex-col border border-base-300 rounded-lg shadow-lg p-2 lg:p-5 overflow-x-auto">
        <div className="flex flex-col">
          <input
            id="search"
            value={search}
            className="input mt-2 border border-gray-200 shadow-sm mb-5 input-sm"
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell className="max-sm:hidden"></Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Applications</Table.HeadCell>

    
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredCustomers.map((customer, index) => (
              <Table.Row key={index} className="hover:bg-gray-100">
                <Table.Cell className="p-5">{index + 1}</Table.Cell>
                <Table.Cell className="max-sm:hidden">
                  {customer.verified && (
                    <GoVerified className="text-primary mr-2" />
                  )}
                </Table.Cell>
                <Table.Cell>{`${customer.firstName} ${customer.lastName}`}</Table.Cell>
                <Table.Cell>{customer.totalApplications}</Table.Cell>

      
                <Table.Cell className="flex items-center p-5">
                  <button
                    className="btn-sm flex items-center gap-2"
                    onClick={() => showDetails(customer)}
                  >
                    <IoEye className="text-lg" />
                    <span className="max-sm:hidden">View Details</span>
                  </button>
                  {customer.verified && (
                    <GoVerified className="text-primary ml-2" />
                  )}
                  {!customer.verified && (
                    <button
                      className="btn-sm bg-primary text-white rounded-xl ml-2"
                      onClick={() => verify(customer.id)}
                    >
                      Verify
                    </button>
                  )}
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
            <p>Name: {`${customer.firstName} ${customer.lastName}`}</p>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Country: {customer.country}</p>

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
