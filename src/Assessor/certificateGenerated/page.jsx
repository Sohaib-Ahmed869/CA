import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import toast from "react-hot-toast";
import { getApplications } from "../../Customer/Services/adminServices";

const CertificateApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const getApplicationsData = async () => {
    try {
      setLoading(true);
      const response = await getApplications();
      const certificateApplications = response.filter(
        (app) => app.currentStatus === "Certificate Generated"
      );
      setApplications(certificateApplications);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplicationsData();
  }, []);

  const filteredApplications = applications.filter(
    (app) =>
      app.applicationId?.toLowerCase().includes(search.toLowerCase()) ||
      app.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      app.user?.lastName?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const currentItems = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const ViewApplicationModal = ({ application, onClose }) => {
    const formatModalDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const calculateDiscountedPrice = (price) => {
      if (!price) return 0;
      if (!application.discount) return price;
      const cleanPrice = parseFloat(price.toString().replace(/,/g, ""));
      return (cleanPrice - application.discount).toFixed(2);
    };

    return (
      <dialog className="modal modal-open">
        <div className="modal-box w-11/12 max-w-5xl h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold">
              Application #{application.applicationId}
            </h2>
            <p className="text-sm text-gray-600">
              Submitted on {formatModalDate(application.status[0].time)}
            </p>
          </div>

          <div className="space-y-6 mt-4">
            {/* Certificate Information */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg">Certificate Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Certificate ID</p>
                    <p>{application.certificateId || "Not available"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Certificate Status</p>
                    <p>Generated</p>
                  </div>
                  <div>
                    <p className="font-semibold">Generation Date</p>
                    <p>
                      {formatModalDate(
                        application.status.find(
                          (s) => s.statusname === "Certificate Generated"
                        )?.time
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status and Payment */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg">Status and Payment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Current Status</p>
                    <p>{application.currentStatus}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Payment Status</p>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        application.paid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {application.paid ? "Paid" : "Unpaid"}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Original Price</p>
                    <p>${application.price}</p>
                  </div>
                  {application.discount && (
                    <>
                      <div>
                        <p className="font-semibold">Discount Applied</p>
                        <p>${application.discount}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Final Price</p>
                        <p>${calculateDiscountedPrice(application.price)}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Full Name</p>
                    <p>
                      {application.user?.firstName} {application.user?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{application.user?.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>{application.user?.phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Country</p>
                    <p>{application.user?.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Initial Screening */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg">Initial Screening</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Industry</p>
                    <p>{application.isf?.industry}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Desired Qualification</p>
                    <p>{application.isf?.lookingForWhatQualification}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Years of Experience</p>
                    <p>{application.isf?.yearsOfExperience}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Location of Experience</p>
                    <p>{application.isf?.locationOfExperience}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Intake Form */}
            {application.sif && (
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-lg">Student Intake Form</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">USI</p>
                      <p>{application.sif.USI}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Gender</p>
                      <p>{application.sif.gender}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Date of Birth</p>
                      <p>{application.sif.dob}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p>{application.sif.homeAddress}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Suburb</p>
                      <p>{application.sif.suburb}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Postcode</p>
                      <p>{application.sif.postcode}</p>
                    </div>
                    <div>
                      <p className="font-semibold">State</p>
                      <p>{application.sif.state}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Assessor Notes */}
            {application.assessorNote && (
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-lg">Assessor Notes</h3>
                  <p className="whitespace-pre-wrap">
                    {application.assessorNote}
                  </p>
                </div>
              </div>
            )}

            {/* Status History */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg">Status History</h3>
                <div className="overflow-x-auto">
                  <table className="table table-compact w-full">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {application.status.map((status, index) => (
                        <tr key={index}>
                          <td>{status.statusname}</td>
                          <td>{formatModalDate(status.time)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    );
  };

  return (
    <div className="p-6">
      {loading && <SpinnerLoader />}

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">
          Certificate Generated Applications
        </h1>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Search by ID or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Application ID</th>
              <th>Customer Name</th>
              <th>Certificate ID</th>
              <th>Generation Date</th>
              <th>Qualification</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="p-4">{app.applicationId}</td>
                <td>{`${app.user?.firstName} ${app.user?.lastName}`}</td>
                <td>{app.certificateId || "N/A"}</td>
                <td>
                  {formatDate(
                    app.status.find(
                      (s) => s.statusname === "Certificate Generated"
                    )?.time
                  )}
                </td>
                <td>{app.isf?.lookingForWhatQualification}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      app.paid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {app.paid ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => setSelectedApplication(app)}
                    className="btn btn-sm btn-primary text-white"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary text-white" : "btn-ghost"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-sm btn-ghost"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {selectedApplication && (
        <ViewApplicationModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
};

export default CertificateApplications;
