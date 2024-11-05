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

import Login from "./Login/page";
import AdminLogin from "./Admin/adminLogin/login";

import RtoLogin from "./RTO/rtoLogin/page";

import CustomerDashboardSignup from "./Customer/components/newUserOptions";
import PaymentPage from "./Customer/checkoutForm";

import AgentLogin from "./Agent/AgentLogin/page";
import AgentSignup from "./Agent/AgentSignup/page";
import MainAgentScreen from "./Agent/Applications/main";
import ScreeningFormAgent from "./Agent/Applications/initial";
import CustomersByAgent from "./Agent/Customers/page";
import ExistingApplicationsbyAgent from "./Agent/Applications/page";

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
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/upload-documents/:id" element={<UploadDocuments />} />
        <Route path="/rto" element={<Sidebar />} />
        <Route path="/rto/login" element={<RtoLogin />} />

        <Route path="/admin" element={<AdminSidebar />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/signup" element={<AgentSignup />} />
        <Route path="/agent" element={<MainAgentScreen />} />
        <Route
          path="/agent/register-customer"
          element={<ScreeningFormAgent />}
        />
        <Route path="/agent/customers" element={<CustomersByAgent />} />
        <Route
          path="/agent/applications"
          element={<ExistingApplicationsbyAgent />}
        />
      </Routes>
    </Router>
  );
}

export default App;
