import { BsClock } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { useState } from "react";

const Timeline = ({ timeline, applicationName, paid, applications }) => {
  console.log("applications", applications);
  const [selectedApplication, setSelectedApplication] = useState();

  const handleApplicationChange = (e) => {
    const Application = applications.find(
      (app) => app.applicationId === e.target.value
    );
    setSelectedApplication(Application || null); // Ensure null if not found
  };
  console.log("selected applicaton", selectedApplication);
  return (
    <div className="p-3 lg:p-4 mt-28 md:mt-3 lg:mt-20 w-full border-b-2 border-t-2 lg:pl-10 lg:pr-10 max-sm:mt-5">
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
          ({timeline.filter((t) => t.time).length + 1}/{timeline.length}) steps
          completed
        </p>
      </div>
      <div className="flex  gap-10 my-10 justify-center ">
        {selectedApplication?.applicationStatus?.map((item, index) => (
          <div key={index}>
            {/* Student Intake Form Status */}
            {item.statusname === "Student Intake Form" && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Intake Form:</span>
                {item.completed ? (
                  <BiCheck className="text-green-500 text-2xl" />
                ) : (
                  <BsClock className="text-red-500 text-2xl" />
                )}
              </div>
            )}

            {/* Payment Status */}
            {item.statusname === "payment" && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Payment:</span>
                {item.paid ? (
                  <span className="text-green-600">Completed</span>
                ) : (
                  <BsClock className="text-red-500 text-2xl" />
                )}
              </div>
            )}

            {/* Documents Uploaded Status */}
            {item.statusname === "documents uploaded" && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Documents:</span>
                {item.completed ? (
                  <span className="text-green-600">Uploaded</span>
                ) : (
                  <BsClock className="text-red-500 text-2xl" />
                )}
              </div>
            )}

            {/* Verification Status */}
            {item.statusname === "verified" && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Verification:</span>
                {item.verified ? (
                  <span className="text-green-600">Verified</span>
                ) : (
                  <BsClock className="text-red-500 text-2xl" />
                )}
              </div>
            )}

            {/* Application Completion Status */}
            {item.statusname === "completed" && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Application Status:</span>
                {item.completed ? (
                  <span className="text-green-600">Completed</span>
                ) : (
                  <BsClock className="text-red-500 text-2xl" />
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
