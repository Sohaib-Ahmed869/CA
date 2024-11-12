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
  const fetchApplications = async () => {
    setSubmissionLoading(true);
    try {
      const applicationsData = await getApplications();
      //filter out the applications that are not paid (status must be Waiting for payment)
      setApplications(applicationsData);

      setUnpaidApplications(
        applicationsData.filter(
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
    //on filter change, filter out the applications that match the filter
    if (activeFilter === "All Payments") {
      setUnpaidApplications(applications);
    }
    if (activeFilter === "Payments Completed") {
      setUnpaidApplications(
        applications.filter((application) => application.paid === true)
      );
    }
    if (activeFilter === "Waiting for Payment") {
      setUnpaidApplications(
        applications.filter(
          (application) => application.currentStatus === "Waiting for Payment"
        )
      );
    }
  }, [activeFilter, applications]);

  return (
    <div className="flex flex-col p-5 w-full justify-between animate-fade">
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
        <img src={paymentsimg} alt="Payments" className="h-36" />
        <div className="flex flex-col lg:w-1/2 w-full">
          <h1 className="text-3xl font-bold">Payment Approval</h1>
          <p className="text-sm mt-2">
            Here you can approve payments for the applications that are pending
            for payment.
          </p>
        </div>
      </div>
      <div className="flex flex-row w-full gap-6 mb-10">
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
      <div className="flex flex-col w-full">
        <table className="w-full table">
          <thead>
            <tr>
              <th className="">ID</th>
              <th className="">Customer Name</th>
              <th className="">Date Created</th>
              <th className="">Status</th>
              <th className="">Payment Date</th>
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
                <td className="">{application.id}</td>

                <td className="">
                  {application.user.firstName + " " + application.user.lastName}
                </td>
                <td className="">{application.status[0].time.split("T")[0]}</td>
                <td className="">{application.currentStatus}</td>
                <td className="">{application.paid ? "paid" : "N/A"}</td>
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
