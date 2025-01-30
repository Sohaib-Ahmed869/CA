import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getApplications } from "../../Customer/Services/adminServices";
const ArchivedApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_REACT_BACKEND_URL;

  // Fetch archived applications
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await getApplications();
        const archivedApplications = response.filter(
          (app) => app.archive === true
        );
        setApplications(archivedApplications);
        console.log(response);
      } catch (error) {
        console.error("Error fetching archived applications:", error);
        toast.error("Failed to fetch archived applications");
      }
      setLoading(false);
    };
    fetchApplications();
  }, []);

  const handleUnarchive = async (applicationId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URL}/api/applications/unArchiveApplication/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Application unarchived successfully");
        // Remove the unarchived application from the list
        setApplications(applications.filter((app) => app.id !== applicationId));
      } else {
        toast.error("Failed to unarchive application");
      }
    } catch (error) {
      console.error("Error unarchiving application:", error);
      toast.error("Failed to unarchive application");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Archived Applications</h1>
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left font-semibold">Application ID</th>
              <th className="p-4 text-left font-semibold">Customer Name</th>
              <th className="p-4 text-left font-semibold">Qualification</th>
              <th className="p-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-t">
                <td className="p-4">
                  {application.applicationId || application.id}
                </td>
                <td className="p-4">
                  {application.user.firstName} {application.user.lastName}
                </td>
                <td className="p-4">
                  {application.isf.lookingForWhatQualification}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleUnarchive(application.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Unarchive
                  </button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No archived applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArchivedApplications;
