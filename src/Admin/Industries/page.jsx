import React, { useState, useEffect } from "react";
import {
  BiEdit,
  BiPlus,
  BiSearch,
  BiRefresh,
  BiCertification,
  BiBuildings,
} from "react-icons/bi";
import { FiDelete, FiEye } from "react-icons/fi";
import {
  HiOutlineDocumentText,
  HiOutlineCurrencyDollar,
  HiOutlineTag,
} from "react-icons/hi";
import {
  createIndustry,
  addCertificateToIndustry,
  getIndustries,
  updatePrice,
  deleteApplication,
  deleteCertificate,
} from "../../Customer/Services/adminServices";
import cert from "../../assets/cert.png";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import { toast, Toaster } from "react-hot-toast";

const Industries = () => {
  //show industries, modal to add industry, modal to add certificate to industry
  const [industries, setIndustries] = useState([]);
  const [industry, setIndustry] = useState("");
  const [industryDescription, setIndustryDescription] = useState("");
  const [qualification, setQualification] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [viewAllCertificates, setViewAllCertificates] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedIndustryName, setSelectedIndustryName] = useState("");
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [IndustryId, setIndustryId] = useState("");
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editPriceModal, setEditPriceModal] = useState(false);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [selectedCertificateId, setSelectedCertificateId] = useState("");
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState(null);

  const fetchIndustries = async () => {
    setSubmissionLoading(true);
    try {
      const response = await getIndustries();
      setIndustries(response.industries);
      setSubmissionLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch industries");
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, [showModal, showCertificateModal, editPriceModal, confirmDeleteModal]);

  const handleAddIndustry = async () => {
    if (!industry.trim()) {
      toast.error("Industry name is required");
      return;
    }

    setSubmissionLoading(true);
    try {
      const response = await createIndustry({
        name: industry,
        description: industryDescription,
      });
      if (response) {
        fetchIndustries();
        setIndustry("");
        setIndustryDescription("");
        setShowModal(false);
        toast.success("Industry added successfully");
      }
    } catch (error) {
      toast.error("Failed to add industry");
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleAddCertificate = async () => {
    if (!IndustryId || !qualification.trim() || !price.trim() || !type) {
      toast.error("All fields are required");
      return;
    }

    setSubmissionLoading(true);
    try {
      const response = await addCertificateToIndustry({
        industry: IndustryId,
        qualification,
        price,
        type,
      });
      if (response) {
        fetchIndustries();
        setQualification("");
        setPrice("");
        setType("");
        setShowCertificateModal(false);
        toast.success("Certificate added successfully");
      }
    } catch (error) {
      toast.error("Failed to add certificate");
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleUpdatePrice = async () => {
    if (!updatedPrice || updatedPrice <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setSubmissionLoading(true);
    try {
      await updatePrice(selectedCertificateId, updatedPrice);

      // Update the local state immediately
      setSelectedCertificates(
        selectedCertificates.map((cert) => {
          if (cert.qualification === selectedCertificateId) {
            return { ...cert, price: updatedPrice };
          }
          return cert;
        })
      );

      setEditPriceModal(false);
      fetchIndustries(); // Keep this to update the background data
      toast.success("Price updated successfully");
    } catch (error) {
      toast.error("Failed to update price");
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleDeleteCertificate = async () => {
    if (!certificateToDelete) return;

    setSubmissionLoading(true);
    try {
      await deleteCertificate(certificateToDelete);
      setConfirmDeleteModal(false);
      setCertificateToDelete(null);
      fetchIndustries();
      toast.success("Certificate deleted successfully");

      // Update the displayed certificates
      if (viewAllCertificates) {
        const updatedIndustry = industries.find(
          (ind) => ind._id === selectedIndustry
        );
        if (updatedIndustry) {
          setSelectedCertificates(updatedIndustry.certifications);
        }
      }
    } catch (error) {
      toast.error("Failed to delete certificate");
    } finally {
      setSubmissionLoading(false);
    }
  };

  const openViewCertificatesModal = (industry) => {
    setSelectedIndustry(industry._id);
    setSelectedIndustryName(industry.name);
    setSelectedCertificates(industry.certifications || []);
    setViewAllCertificates(true);
  };

  // Filter industries based on search term
  const filteredIndustries = industries.filter(
    (industry) =>
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-8 px-4 sm:px-6 lg:px-8 shadow-md mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0 gap-3">
            <div className="flex-shrink-0 bg-white p-3 rounded-full">
              <img src={cert} alt="Certifications" className="h-16 w-16" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Industry Management
              </h1>
              <p className="text-emerald-100">
                Manage industries and their associated certifications
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 bg-white text-emerald-700 rounded-lg shadow hover:bg-emerald-50 transition-colors duration-200"
            >
              <BiPlus className="mr-2" />
              Add Industry
            </button>
            <button
              onClick={() => setShowCertificateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-white text-emerald-700 rounded-lg shadow hover:bg-emerald-50 transition-colors duration-200"
            >
              <BiCertification className="mr-2" />
              Add Certificate
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Search industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={fetchIndustries}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <BiRefresh className="mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Industries Table */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <BiBuildings className="mr-2" /> Industries
              <span className="ml-2 text-sm text-gray-500">
                ({filteredIndustries.length})
              </span>
            </h3>
          </div>

          {filteredIndustries.length === 0 ? (
            <div className="text-center py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No industries found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search term."
                  : "Get started by creating a new industry."}
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <BiPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Industry
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Industry
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Certificates
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredIndustries.map((industry) => (
                    <tr
                      key={industry._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {industry.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-md">
                          {industry.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                            {industry.certifications?.length || 0} certificates
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openViewCertificatesModal(industry)}
                          className="text-emerald-600 hover:text-emerald-900 focus:outline-none focus:underline transition-colors duration-150 inline-flex items-center"
                        >
                          <FiEye className="mr-1" /> View Certificates
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Industry Modal */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
                    <BiBuildings className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Industry
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="industry-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Industry Name *
                        </label>
                        <input
                          type="text"
                          id="industry-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="e.g. Healthcare, Construction, IT"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="industry-description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          id="industry-description"
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Brief description of the industry"
                          value={industryDescription}
                          onChange={(e) =>
                            setIndustryDescription(e.target.value)
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddIndustry}
                >
                  Add Industry
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
                    <BiCertification className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Certificate
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="industry-select"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Select Industry *
                        </label>
                        <select
                          id="industry-select"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md shadow-sm"
                          value={IndustryId}
                          onChange={(e) => setIndustryId(e.target.value)}
                        >
                          <option value="">Select Industry</option>
                          {industries.map((industry) => (
                            <option key={industry.id} value={industry.id}>
                              {industry.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="qualification"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Qualification *
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineDocumentText className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="qualification"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="e.g. Diploma in Management"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price *
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="price"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="e.g. 495"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="type"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Type *
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineTag className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            id="type"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                          >
                            <option value="">Select Type</option>
                            <option value="aes">AES</option>
                            <option value="educube">Educube</option>
                            <option value="default">Default</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddCertificate}
                >
                  Add Certificate
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowCertificateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Certificates Modal */}
      {viewAllCertificates && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-emerald-600 px-4 py-3">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <BiCertification className="mr-2" />
                  Certificates for {selectedIndustryName}
                </h3>
              </div>
              <div className="bg-white p-4">
                {selectedCertificates.length === 0 ? (
                  <div className="text-center py-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No certificates found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      This industry doesn't have any certificates yet.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setViewAllCertificates(false);
                          setShowCertificateModal(true);
                          setIndustryId(selectedIndustry);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                        <BiPlus
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Add Certificate
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Qualification
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedCertificates.map((certificate) => (
                          <tr key={certificate._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {certificate.qualification}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                ${certificate.price}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {certificate.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => {
                                  setSelectedCertificateId(
                                    certificate.qualification
                                  );
                                  setUpdatedPrice(certificate.price);
                                  setEditPriceModal(true);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 mr-3 focus:outline-none focus:underline transition-colors duration-150"
                              >
                                <BiEdit className="inline h-5 w-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setCertificateToDelete(certificate._id);
                                  setConfirmDeleteModal(true);
                                }}
                                className="text-red-600 hover:text-red-900 focus:outline-none focus:underline transition-colors duration-150"
                              >
                                <FiDelete className="inline h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setViewAllCertificates(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setViewAllCertificates(false);
                    setShowCertificateModal(true);
                    setIndustryId(selectedIndustry);
                  }}
                >
                  <BiPlus className="mr-2" />
                  Add Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Price Modal */}
      {editPriceModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
                    <HiOutlineCurrencyDollar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Update Certificate Price
                    </h3>
                    <div className="mt-4">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Price *
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="price"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="e.g. 495"
                          value={updatedPrice}
                          onChange={(e) => setUpdatedPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUpdatePrice}
                >
                  Update Price
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setEditPriceModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDeleteModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiDelete className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Certificate
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this certificate? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteCertificate}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setConfirmDeleteModal(false);
                    setCertificateToDelete(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Industries;
