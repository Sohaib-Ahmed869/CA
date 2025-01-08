import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import paymentsimg from "../../assets/payments.png";
import {
  getApplications,
  markApplicationAsPaid,
} from "../../Customer/Services/adminServices";
import toast from "react-hot-toast";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import { Toaster } from "react-hot-toast";

const PaymentApproval = () => {
  const statuses = [
    "All Payments",
    "Payments Completed",
    "Waiting for Payment",
  ];

  const [activeFilter, setActiveFilter] = useState("Waiting for Payment");
  const paymentSuccess = () => toast.success("Payment approved successfully");
  const paymentError = () => toast.error("Failed to approve payment");
  const [applications, setApplications] = useState([]);
  const [unpaidApplications, setUnpaidApplications] = useState([]);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchApplications = async () => {
    setSubmissionLoading(true);
    try {
      const applicationsData = await getApplications();
      // Sort applications by date in descending order (most recent first)
      const sortedApplications = applicationsData.sort((a, b) => {
        return new Date(b.status[0].time) - new Date(a.status[0].time);
      });
      setApplications(sortedApplications);
      setUnpaidApplications(
        sortedApplications.filter(
          (application) => application.currentStatus === "Waiting for Payment"
        )
      );
      setSubmissionLoading(false);
    } catch (err) {
      console.log(err);
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const [application, setApplication] = useState({});
  const [showModal, setShowModal] = useState(false);

  const onClick = (application) => {
    setApplication(application);
    setShowModal(true);
  };

  const approvePayment = async (id) => {
    const response = await markApplicationAsPaid(id);
    if (response) {
      paymentSuccess();
      fetchApplications();
      setShowModal(false);
    }
  };

  useEffect(() => {
    let filtered = [...applications];

    // Apply status filter
    if (activeFilter === "Payments Completed") {
      filtered = filtered.filter((application) => application.paid === true);
    } else if (activeFilter === "Waiting for Payment") {
      filtered = filtered.filter((application) => application.paid === false);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((application) =>
        (application.user.firstName + " " + application.user.lastName)
          .toLowerCase()
          .includes(searchLower)
      );
    }

    setUnpaidApplications(filtered);
  }, [activeFilter, applications, searchTerm]);

  const calculateDiscountedPrice = (price, discount) => {
    if (!price) return 0;
    if (!discount) return "N/A";
    const cleanPrice = parseFloat(price.toString().replace(/,/g, ""));
    return cleanPrice - discount;
  };

  return (
    <div className="flex flex-col animate-fade">
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
        <img src={paymentsimg} alt="Payments" className="h-36" />
        <div className="flex flex-col lg:w-1/2">
          <h1 className="text-3xl font-bold">Payment Approval</h1>
          <p className="text-sm mt-2">
            Here you can approve payments for the applications that are pending
            for payment.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-10">
        <div className="flex flex-row w-full gap-6 max-sm:flex-col">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`btn ${
                activeFilter === status ? "btn-primary" : "btn-secondary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Search by customer name..."
            className="input input-bordered w-full max-w-full mt-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto max-sm:border">
        <table className="table">
          <thead className="sticky top-0 bg-gray-200">
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Date Created</th>
              <th>Payment Amount</th>
              <th>Discounted Price</th>
              <th>Amount Paid</th>
              <th>Status</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {unpaidApplications.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No applications found
                </td>
              </tr>
            )}
            {unpaidApplications.map((application) => (
              <tr key={application.id}>
                <td>
                  {application.applicationId
                    ? application.applicationId
                    : application.id}
                </td>
                <td>
                  {application.user.firstName + " " + application.user.lastName}
                </td>
                <td>{application.status[0].time.split("T")[0]}</td>
                <td>{application.price}</td>
                <td>
                  {calculateDiscountedPrice(
                    application.price,
                    application.discount
                  )}
                </td>
                <td>{application.amount_paid}</td>
                <td>{application.currentStatus}</td>
                <td>
                  {application.paid
                    ? application.amount_paid
                      ? application.full_paid
                        ? "Full Paid"
                        : "Partial Paid"
                      : "Paid"
                    : "Not Paid"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold mb-5">Approve Payment</h2>
            <p className="mb-5">
              Are you sure you want to approve payment for application ID{" "}
              {application.id}?
            </p>
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="btn bg-red-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => approvePayment(application.id)}
                className="btn btn-primary text-white"
              >
                Approve
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PaymentApproval;
