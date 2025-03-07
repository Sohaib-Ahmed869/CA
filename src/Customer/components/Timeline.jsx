import { BsClock } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { useEffect, useState } from "react";

const Timeline = ({
  timeline,
  applicationId,
  applicationName,
  paid,
  applications,
}) => {
  console.log("applications", applications);
  const [newTimeLine, setnewTimeline] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const statuses = [
    "Student Intake Form",
    "Payment Awaiting",
    "Waiting for Documents",
    "Sent to RTO",
    "Certificate Generated",
  ];

  //   useEffect(() => {
  //     if (selectedApplication) {
  //       setnewTimeline(
  //         statuses.map((status) => ({
  //           statusname: status,
  //           time: selectedApplication?.status.some(
  //             (s) => s.statusname === status
  //           ),
  //         }))
  //       );
  //     }
  //   }, [selectedApplication]);
  //   console.log("new timeline", newTimeLine);

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
      <div className="flex flex-col lg:items-center items-center justify-center lg:block">
        <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
          {console.log("timeline", timeline)}

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
          ))}
        </div>
      </div>
    </div>
  );
};
export default Timeline;
