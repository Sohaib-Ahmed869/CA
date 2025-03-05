import React, { useState } from "react";
import Papa from "papaparse";
import { BiDownload } from "react-icons/bi";

const FilteredExportButton = ({
  applications,
  search,
  selectedFilter,
  selectedColorFilter,
  selectedIndustryFilter,
  selectedCallAttemptsFilter,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const filterApplications = (apps) => {
    let filtered = apps;

    // Filter by search
    if (search) {
      const searchValue = search.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.applicationId?.toLowerCase().includes(searchValue) ||
          app.user?.firstName?.toLowerCase().includes(searchValue) ||
          app.user?.lastName?.toLowerCase().includes(searchValue) ||
          app.user?.phone?.toLowerCase().includes(searchValue)
      );
    }

    // Filter by assignment
    if (selectedFilter !== "All") {
      if (selectedFilter === "Assigned to N/A") {
        filtered = filtered.filter((app) => !app.assignedAdmin);
      } else {
        const admin = selectedFilter.replace("Assigned to ", "");
        filtered = filtered.filter((app) => app.assignedAdmin === admin);
      }
    }

    // Filter by color status
    if (selectedColorFilter !== "All") {
      const colorMap = {
        "Hot Lead": "red",
        "Warm Lead": "orange",
        "Cold Lead": "gray",
        "Proceeded With Payment": "yellow",
        "Impacted Student": "lightblue",
        Agent: "pink",
        Completed: "green",
      };

      if (selectedColorFilter === "Default") {
        filtered = filtered.filter(
          (app) => !app.color || app.color === "white"
        );
      } else {
        filtered = filtered.filter(
          (app) => app.color === colorMap[selectedColorFilter]
        );
      }
    }

    // Filter by industry
    if (selectedIndustryFilter !== "All") {
      filtered = filtered.filter(
        (app) => app.isf.industry === selectedIndustryFilter
      );
    }

    // Filter by call attempts
    if (selectedCallAttemptsFilter !== "All") {
      if (selectedCallAttemptsFilter === "None") {
        filtered = filtered.filter((app) => !app.contactAttempts);
      } else {
        filtered = filtered.filter(
          (app) => app.contactAttempts === parseInt(selectedCallAttemptsFilter)
        );
      }
    }

    return filtered;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Filter applications based on current filters
      const filteredApplications = filterApplications(applications);

      // Transform data for CSV
      const csvData = filteredApplications.map((app) => {
        const latestStatus = app.status?.[0] || { statusname: "", time: "" };
        const colorStatus =
          app.color === "red"
            ? "Hot Lead"
            : app.color === "yellow"
            ? "Proceeded With Payment"
            : app.color === "gray"
            ? "Cold Lead"
            : app.color === "orange"
            ? "Warm Lead"
            : app.color === "lightblue"
            ? "Impacted Student"
            : app.color === "green"
            ? "Completed"
            : app.color === "pink"
            ? "Agent"
            : "N/A";

        return {
          "Application ID": app.applicationId || "",
          "First Name": app.user?.firstName || "",
          "Last Name": app.user?.lastName || "",
          Phone: app.user?.phone || "",
          Email: app.user?.email || "",
          Price: app.price || "",
          "Agent Assigned": app.assignedAdmin || "",
          "Current Status": app.currentStatus || "",
          "Color Status": colorStatus,
          "Date Created": formatDate(latestStatus.time),
          "Payment Status": app.paid ? "Paid" : "Unpaid",
          "Contact Status": app.contactStatus || "",
          "Call Attempts": app.contactAttempts || "",
          Notes: app.note || "",
        };
      });

      // Generate CSV
      const csv = Papa.unparse(csvData, {
        quotes: true,
        header: true,
      });

      // Create and download file
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `applications_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting applications:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="btn btn-primary text-white flex items-center gap-2"
      disabled={isExporting}
    >
      {isExporting ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <BiDownload className="text-xl" />
      )}
      {isExporting ? "Exporting..." : "Export to CSV"}
    </button>
  );
};

export default FilteredExportButton;
