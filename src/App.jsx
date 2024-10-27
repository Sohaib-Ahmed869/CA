import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerDashboard from "./Customer/components/options";
import ScreeningForm from "./Customer/inspection";
import ScreeningForm2 from "./Customer/newApplication";
import ExistingApplications from "./Customer/existingApplications/page";
import StudentIntakeForm from "./Customer/applicationSteps/studentForm/studentForm";
import UploadDocuments from "./Customer/uploadDocuments/page";

import Sidebar from "./RTO/components/siderbar";
import AdminSidebar from "./Admin/Sidebar/page";



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

        <Route path="/admin" element={<AdminSidebar />} />

        
      </Routes>
    </Router>
  );
}

export default App;
