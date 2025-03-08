import { BsClock } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "react-router-dom";
import formImg from "../../assets/applications.png";
import paymentImg from "../../assets/payments.png";
import docImg from "../../assets/cert.png";
import completedImg from "../../assets/completed.png";
import verifiedImg from "../../assets/verifiedimg.png";
const Timeline = ({ timeline, applicationName, paid, applications }) => {
  console.log("applications", applications);
  const [selectedApplication, setSelectedApplication] = useState(
    applications?.length > 0 ? applications[0] : null
  );

  const handleApplicationChange = (e) => {
    const Application = applications.find(
      (app) => app.applicationId === e.target.value
    );
    setSelectedApplication(Application || null); // Ensure null if not found
  };

  const completedSteps =
    selectedApplication?.applicationStatus?.filter(
      (step) => step.completed || step.verified || step.paid
    ).length || 0;
  console.log("selected applicaton", selectedApplication);
  return (
    <div className="p-3   bg-gradient-to-r from-green-400 via-green-500 to-green-600 lg:p-4 mt-28 md:mt-3 lg:mt-20 w-full border-b-2 border-t-2 lg:pl-10 lg:pr-10 max-sm:mt-5">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center items-center">
        <div className=" flex justify-between items-center text-md  text-left">
          <span className="text-base mr-2  text-white block no-wrap">
            ApplicaitonID:
          </span>
          <select
            name="applications"
            id="applicationSelect"
            className="text-sm rounded-lg  border border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500  w-full p-2.5"
            onChange={handleApplicationChange}
          >
            {applications?.map((data) => (
              <option key={data.applicationId} value={data.applicationId}>
                {data.applicationId}
              </option>
            ))}
          </select>
        </div>
        <p className="text-md  text-white text-left">
          Applying for: <span className="font-semibold">{applicationName}</span>
        </p>

        <p className="text-sm text-white">
          {completedSteps}/{selectedApplication?.applicationStatus?.length - 1}{" "}
          steps completed
        </p>
      </div>
      {/* Timeline */}
      <div className="flex   gap-10 my-10 justify-stretch    md:flex-wrap">
        {selectedApplication?.applicationStatus?.map((item, index) => (
          <div key={index}>
            {/* Student Intake Form Status */}
            {item.statusname === "Student Intake Form" && (
              <Link
                to={"/student-intake-form/" + selectedApplication.applicationId}
                className="flex items-center flex-col font-mono w-72  bg-gray-50 p-4 rounded-lg gap-2"
              >
                <img src={formImg} className="w-28" />
                <span className="text-3xl  max-sm:text-2xl  ">Intake Form</span>
                {item.completed ? (
                  <span className="flex flex-row align-middle items-center text-2xl">
                    Status :
                    <BsCheck2Circle className="text-green-500 mt-2 text-4xl" />
                  </span>
                ) : (
                  <span className="flex flex-row align-middle items-center text-2xl">
                    Status :
                    <BsClock className="text-red-500 mt-2 ml-1 text-4xl" />
                  </span>
                )}
              </Link>
            )}

            {/* Payment Status */}
            {item.statusname === "payment" && (
              <div className="flex items-center flex-col font-mono  w-72 bg-gray-50 p-4 rounded-lg gap-2">
                <img src={paymentImg} className="w-28" />

                <span className="text-3xl max-sm:text-2xl">Payment</span>
                {item.paid ? (
                  <span className="flex flex-row align-middle items-center text-2xl">
                    Status :
                    <BsCheck2Circle className="text-green-500 mt-2 text-4xl" />
                  </span>
                ) : (
                  <span className="flex flex-row align-middle items-center text-2xl">
                    Status :
                    <BsClock className="text-red-500 mt-2  ml-1 text-4xl" />
                  </span>
                )}
              </div>
            )}

            {/* Documents Uploaded Status */}
            {item.statusname === "documents uploaded" && (
              <Link
                to={"/upload-documents/" + selectedApplication.applicationId}
                className="flex items-center flex-col font-mono px-12 bg-gray-50 p-4 rounded-lg gap-2"
              >
                <img src={docImg} className="w-28" />
                <span className="text-3xl max-sm:text-2xl">Documents</span>
                {item.completed ? (
                  <span className="flex flex-row align-middle items-center text-2xl">
                    Status :
                    <BsCheck2Circle className="text-green-500 mt-2 ml-2  text-4xl" />
                  </span>
                ) : (
                  <span className="flex flex-row align-middle items-center text-2xl">
                    Status :
                    <BsClock className="text-red-500 mt-2 ml-1 text-4xl" />
                  </span>
                )}
              </Link>
            )}

            {/* Verification Status */}
            {item.statusname === "verified" && (
              <div className="flex items-center flex-col font-mono  bg-gray-50 p-4 rounded-lg gap-2">
                <img src={verifiedImg} className="w-28" />
                <span className="text-3xl max-sm:text-2xl">Verification</span>
                {item.verified ? (
                  <span className="flex flex-row align-middle items-center text-2xl">
                    Status :
                    <BsCheck2Circle className="text-green-500 mt-2 text-4xl" />
                  </span>
                ) : (
                  <span className="flex flex-row align-middle items-center text-2xl">
                    Status :
                    <BsClock className="text-red-500 mt-2 ml-1  text-4xl" />
                  </span>
                )}
              </div>
            )}

            {/* Application Completion Status */}
            {item.statusname === "completed" && (
              <div className="flex items-center flex-col font-mono  bg-gray-50 p-4 rounded-lg gap-2">
                <img src={completedImg} className="w-28" />
                <span className="text-3xl max-sm:text-2xl">
                  Application Status:
                </span>
                {item.completed ? (
                  <span className="flex flex-row align-middle items-center text-2xl">
                    Status :
                    <BsCheck2Circle className="text-green-500 mt-2 text-4xl" />
                  </span>
                ) : (
                  <span className="flex flex-row align-middle items-center text-2xl">
                    Status :
                    <BsClock className="text-red-500 mt-2 ml-1 text-3xl" />
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* 
          {timeline.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-start mb-6 mt-6 max-sm:mb-2 max-sm:mt-2"
            >
              <div className="flex flex-col items-center mr-4">
                <div className="text-4xl max-sm:text-2xl">
                  {item.statusname === "Payment Awaiting" ? (
                    paid ? (
                      <BiCheck className=" bg-green-500 rounded-full p-1" />
                    ) : (
                      <BsClock className="text-white bg-red-500 rounded-full p-1" />
                    )
                  ) : item.time ? (
                    <BiCheck className=" bg-green-500 rounded-full p-1" />
                  ) : (
                    <BsClock className="text-gray-500 bg-gray-200 rounded-full p-1" />
                  )}
                </div>
                {index !== timeline.length - 1 && (
                  <div className="w-px bg-gray-300 h-full"></div>
                )}
              </div>
              <div
                className="text-md "
                onClick={() =>
                  (window.location.href = "/existing-applications")
                }
              >
                <p className="font-medium">
                  {item.statusname === "Waiting for Documents"
                    ? "Student Intake Form"
                    : null}
                  {item.statusname === "Student Intake Form"
                    ? "Skills Assessment"
                    : null}
                  {item.statusname === "Payment Awaiting"
                    ? paid
                      ? "Payment"
                      : "Payment"
                    : null}
                  {item.statusname === "Sent to RTO"
                    ? paid
                      ? "Sent for RTO Assessment"
                      : "Documents Uploaded"
                    : null}
                  {item.statusname === "Certificate Generated"
                    ? "Completed"
                    : null}
                  {item.statusname === "Rejected"
                    ? "Application Rejected"
                    : null}
                </p>
              </div>
            </div>
          ))} */}
    </div>
  );
};
export default Timeline;
