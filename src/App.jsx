import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerDashboard from "./Customer/components/options";
import ScreeningForm from "./Customer/inspection";
import ScreeningForm2 from "./Customer/newApplication";
import ExistingApplications from "./Customer/existingApplications/page";
import StudentIntakeForm from "./Customer/applicationSteps/studentForm/studentForm";
import UploadDocuments from "./Customer/uploadDocuments/page";

import Sidebar from "./RTO/components/siderbar";

import CustomersInfo from "./Admin/customers/page";
import ExistingApplicationsAdmin from "./Admin/applications/page";
import PaymentApproval from "./Admin/payments/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/screening" element={<ScreeningForm />} />
        <Route path="/new-application" element={<ScreeningForm2 />} />
        <Route
          path="/existing-applications"
          element={<ExistingApplications />}
        />
        <Route path="/student-intake-form" element={<StudentIntakeForm />} />
        <Route path="/upload-documents" element={<UploadDocuments />} />
        <Route path="/rto" element={<Sidebar />} />
        <Route path="/admin/customers" element={<CustomersInfo />} />
        <Route
          path="/admin/existing-applications"
          element={<ExistingApplicationsAdmin />}
        />
        <Route path="/admin/payments" element={<PaymentApproval />} />
      </Routes>
    </Router>
  );
}

export default App;
