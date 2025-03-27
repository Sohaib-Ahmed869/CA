export const getUserSpecificStats = (applications) => {
  // Removed unused parameters
  if (!applications) return null; // Only check applications

  // Paid Applications
  const paidApplications = applications.filter(
    (app) => app.full_paid || parseFloat(app.amount_paid) > 0
  ).length;
  const totalApplications = applications.length;

  // Completed Applications (Certificate Generated)
  const completedApplications = applications.filter(
    (app) => app.currentStatus === "Certificate Generated"
  ).length;

  // Conversion Rate Calculation
  const conversionRate = totalApplications
    ? ((paidApplications / totalApplications) * 100).toFixed(1)
    : 0;

  // Completion Rate Calculation
  const completionRate = totalApplications
    ? ((completedApplications / totalApplications) * 100).toFixed(1)
    : 0;

  // Certificates Generated (includes subsequent statuses)
  const certificatesGenerated = applications.filter(
    (app) =>
      app.currentStatus === "Certificate Generated" ||
      app.currentStatus === "Dispatched" ||
      app.currentStatus === "Completed"
  ).length;

  return {
    conversionRate,
    completionRate,
    certificatesGenerated,
    totalApplications,
  };
};

// Updated handler function
const handleUserSelection = (agentName) => {
  if (agentName === "reset") {
    setFilteredApplications(applications);
    setSelectedAgent("reset");
    return;
  }
  setSelectedAgent(agentName);

  // Filter applications for selected user
  const filtered = applications.filter(
    (app) => app.assignedAdmin === agentName
  );
  setFilteredApplications(filtered);

  // Compute user-specific stats with proper arguments
  const {
    conversionRate,
    completionRate,
    certificatesGenerated,
    totalApplications,
  } = getUserSpecificStats(filtered); // Only pass filtered apps

  setStats((prevStats) => ({
    ...prevStats,
    conversionRate,
    completionRate,
    certificatesGenerated,
    totalApplications,
  }));
};
