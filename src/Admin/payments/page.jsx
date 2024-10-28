import React, { useState } from "react";
import { GoVerified } from "react-icons/go";
import paymentsimg from "../../assets/payments.png";
const PaymentApproval = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      customerId: 1,
      customerName: "Alice Smith",
      dateCreated: new Date(),
      status: "Sent to RTO",
      paymentStatus: true,
      paymentDate: new Date(),
      verified: true,
    },
    {
      id: 2,
      customerId: 2,
      customerName: "Bob Johnson",
      dateCreated: new Date(),
      status: "Waiting for Payment",
      paymentStatus: false,
      paymentDate: null,
      verified: false,
    },
    {
      id: 22,
      customerId: 2,
      customerName: "Bob Johnson",
      dateCreated: new Date(),
      status: "Waiting for Payment",
      paymentStatus: false,
      paymentDate: null,
      verified: true,
    },
    {
      id: 3,
      customerId: 3,
      customerName: "Charlie Brown",
      dateCreated: new Date(),
      status: "Student Intake Form pending",
      paymentStatus: true,
      paymentDate: new Date(),
      verified: true,
    },
    {
      id: 4,
      customerId: 4,
      customerName: "David Miller",
      dateCreated: new Date(),
      status: "Upload Documents",
      paymentStatus: true,
      paymentDate: new Date(),
      verified: true,
    },
    {
      id: 5,
      customerId: 5,
      customerName: "Eve Wilson",
      dateCreated: new Date(),
      status: "Certficated Generated",
      paymentStatus: true,
      paymentDate: new Date(),
      verified: true,
    },
    {
      id: 23,
      customerId: 5,
      customerName: "Eve Wilson",
      dateCreated: new Date(),
      status: "Dispatched",
      paymentStatus: true,
      paymentDate: new Date(),
      verified: true,
    },
    {
      id: 24,
      customerId: 5,
      customerName: "Eve Wilson",
      dateCreated: new Date(),
      status: "Completed",
      paymentStatus: true,
      paymentDate: new Date(),
      verified: true,
    },
  ]);

  const [unpaidApplications, setUnpaidApplications] = useState(
    applications.filter((application) => !application.paymentStatus)
  );

  const [application, setApplication] = useState({});
  const [showModal, setShowModal] = useState(false);

  const onClick = (application) => {
    setApplication(application);
    setShowModal(true);
  };

  const approvePayment = (id) => {
    setApplications(
      applications.map((application) =>
        application.id === id
          ? { ...application, paymentStatus: true, paymentDate: new Date() }
          : application
      )
    );
    setUnpaidApplications(
      unpaidApplications.filter((application) => application.id !== id)
    );
    setShowModal(false);
  };

  return (
    <div className="flex flex-col p-5 w-full justify-between animate-fade">
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
      <div className="flex flex-col w-full">
        <table className="w-full table">
          <thead>
            <tr>
              <th className="">ID</th>
              <th className="">Customer ID</th>
              <th className="">Customer Name</th>
              <th className="">Date Created</th>
              <th className="">Status</th>
              <th className="">Payment Date</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {unpaidApplications.map((application) => (
              <tr key={application.id}>
                <td className="">{application.id}</td>
                <td className="flex items-center gap-2">
                  {application.customerId}{" "}
                </td>
                <td className="">{application.customerName}</td>
                <td className="">
                  {application.dateCreated.toLocaleDateString()}
                </td>
                <td className="">{application.status}</td>
                <td className="">
                  {application.paymentDate
                    ? application.paymentDate.toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="">
                  <button
                    onClick={() => onClick(application)}
                    className="btn btn-primary btn-sm text-white"
                  >
                    Approve Payment
                  </button>
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
