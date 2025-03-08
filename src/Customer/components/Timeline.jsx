import { BsClock } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "react-router-dom";

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
    <div className="p-3   bg-gray-100 lg:p-4 mt-28 md:mt-3 lg:mt-20 w-full border-b-2 border-t-2 lg:pl-10 lg:pr-10 max-sm:mt-5">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center items-center">
        <div className=" flex justify-between items-center text-md  text-left">
          <span className="text-base mr-2 block no-wrap">ApplicaitonID:</span>
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
        <p className="text-md  text-left">
          Applying for: <span className="font-semibold">{applicationName}</span>
        </p>

        <p className="text-sm text-gray-800">
          {completedSteps}/{selectedApplication?.applicationStatus?.length - 1}{" "}
          steps completed
        </p>
      </div>
      <div className="flex bg-gray-50 p-4 rounded-lg  gap-10 my-10 justify-stretch ">
        {selectedApplication?.applicationStatus?.map((item, index) => (
          <div key={index}>
            {/* Student Intake Form Status */}
            {item.statusname === "Student Intake Form" && (
              <Link className="flex items-center  gap-2">
                <span className="text-3xl  max-sm:text-2xl  ">
                  Intake Form:
                </span>
                {item.completed ? (
                  <BsCheck2Circle className="text-green-500 mt-2 text-4xl" />
                ) : (
                  <BsClock className="text-red-500 mt-2 text-4xl" />
                )}
              </Link>
            )}

            {/* Payment Status */}
            {item.statusname === "payment" && (
              <Link className="flex items-center gap-2">
                <span className="text-3xl max-sm:text-2xl">Payment:</span>
                {item.paid ? (
                  <BsCheck2Circle className="text-green-500 mt-2 text-4xl" />
                ) : (
                  <BsClock className="text-red-500 mt-2 text-4xl" />
                )}
              </Link>
            )}

            {/* Documents Uploaded Status */}
            {item.statusname === "documents uploaded" && (
              <Link className="flex items-center gap-2">
                <span className="text-3xl max-sm:text-2xl">Documents:</span>
                {item.completed ? (
                  <BsCheck2Circle className="text-green-500 mt-2 text-4xl" />
                ) : (
                  <BsClock className="text-red-500 mt-2 text-4xl" />
                )}
              </Link>
            )}

            {/* Verification Status */}
            {item.statusname === "verified" && (
              <Link className="flex items-center gap-2">
                <span className="text-3xl max-sm:text-2xl">Verification:</span>
                {item.verified ? (
                  <BsCheck2Circle className="text-green-500 mt-2 text-4xl" />
                ) : (
                  <BsClock className="text-red-500 mt-2 text-4xl" />
                )}
              </Link>
            )}

            {/* Application Completion Status */}
            {item.statusname === "completed" && (
              <Link className="flex items-center gap-2">
                <span className="text-3xl max-sm:text-2xl">
                  Application Status:
                </span>
                {item.completed ? (
                  <BsCheck2Circle className="text-green-500 mt-2 text-4xl" />
                ) : (
                  <BsClock className="text-red-500 mt-2 text-4xl" />
                )}
              </Link>
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
