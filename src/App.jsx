import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerDashboard from "./Customer/components/options";
import ScreeningForm from "./Customer/inspection";
import ScreeningForm2 from "./Customer/newApplication";
import ExistingApplications from "./Customer/existingApplications/page";
import StudentIntakeForm from "./Customer/applicationSteps/studentForm/studentForm";
import UploadDocuments from "./Customer/uploadDocuments/page";

import Sidebar from "./RTO/components/siderbar";
import AdminSidebar from "./Admin/Sidebar/page";
import Dashboard from "./Admin/dashboard/page";

import Login from "./Customer/login";
import AdminLogin from "./Admin/adminLogin/login";

import RtoLogin from "./RTO/rtoLogin/page";

import CustomerDashboardSignup from "./Customer/components/newUserOptions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/signup" element={<CustomerDashboardSignup />} />
        <Route path="/screening" element={<ScreeningForm />} />
        <Route path="/new-application" element={<ScreeningForm2 />} />
        <Route
          path="/existing-applications"
          element={<ExistingApplications />}
        />
        <Route
          path="/student-intake-form/:id"
          element={<StudentIntakeForm />}
        />
        <Route path="/upload-documents/:id" element={<UploadDocuments />} />
        <Route path="/rto" element={<Sidebar />} />
        <Route path="/rto/login" element={<RtoLogin />} />

        <Route path="/admin" element={<AdminSidebar />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
