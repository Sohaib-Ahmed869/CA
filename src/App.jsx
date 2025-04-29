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
import AssessorSidebar from "./Assessor/Sidebar/page";
import ViewApplication from "./Customer/ViewApplication/page";
import TwoFactorAuth from "./TwoFactorAuth/TwoFactorAuth";
import ProtectedRoute from "./utils/RouteProtection";
import EnrollmentForm from "./Customer/AdditionalForms/cibtEnrollmentForm/EnrollmentForm";
import EntryInterviewForm from "./Customer/AdditionalForms/cibtEntryInterviewForm/EntryInterviewForm";
import LLNAssessment from "./Customer/AdditionalForms/LLNAssessment/LLNAssessment";
import RPLAssessment from "./Customer/AdditionalForms/RPLIntakeCPC-31320- Certificate-IIIinWallandFloorTiling/RPL-intake-cpc31320";
import RPLIntakeCPC31320WallFloorTiling from "./Customer/AdditionalForms/RPLIntakeCPC-31320- Certificate-IIIinWallandFloorTiling/RPL-intake-cpc31320";
import RPLIntakeCPC30220Carpentry from "./Customer/AdditionalForms/Carpentry/RPLIntakeCPC-30220-Certificate-III-Carpentry/RPL-intake-cpc30220-carpentry";
import RPLApplicationFormCPC30220 from "./Customer/AdditionalForms/Carpentry/RPLApplicationForm-cpc30220/RPL-application-form-CPC-30220";
import RPLAssessmentCPC30220 from "./Customer/AdditionalForms/Carpentry/RPLSelf-Assessment-Information-Kit/cpc-30220-self-assessment-kit";
import FrontierRPLEnrollmentForm from "./Customer/AdditionalForms/Frontier/frontier-rpl-enrollment-form";
import RPLIntakeCPC30320Concreting from "./Customer/AdditionalForms/Concreting/rpl-intake-cpc30320";
import RPLIntakeCPC31420WaterProofing from "./Customer/AdditionalForms/ConstructionWaterProofing/rpl-intake-cpc31420";
import RPLApplicationFormCPC32420Plumbing from "./Customer/AdditionalForms/Plumbing/rpl-application-form-cpc-32420";
import RPLSelfAssessmentCPC32420 from "./Customer/AdditionalForms/Plumbing/self-Assessment-plumbing-cpc-32420";
import RPLSelfAssessmentViewer from "./Customer/AdditionalForms/Plumbing/self-Assessment-plumbing-cpc-32420";
import RPLSelfAssessmentApp from "./Customer/AdditionalForms/Plumbing/self-Assessment-plumbing-cpc-32420";
import RPLIntakeCPC32620RoofPlumbing from "./Customer/AdditionalForms/RoofPlumbing/rpl-Intake-CPC32620-CertificateIII-inRoofPlumbing";

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
          path="/view-application/:userId/:id"
          element={<ViewApplication />}
        />
        <Route
          path="/view-application-docs/:userId/:id"
          element={<ViewApplication />}
        />
        <Route
          path="/student-intake-form/:id"
          element={<StudentIntakeForm />}
        />

        {/* Additional form routes */}
        <Route path="/cibt-enrollment-form" element={<EnrollmentForm />} />
        <Route
          path="/cibt-entry-interview-form"
          element={<EntryInterviewForm />}
        />
        <Route path="/lln-assessment" element={<LLNAssessment />} />
        <Route
          path="/rpl-enrollment-form"
          element={<RPLIntakeCPC31320WallFloorTiling />}
        />
        <Route
          path="/rpl-intake-cpc-31320-certificate-3-wall-and-floor-tiling"
          element={<RPLAssessment />}
        />
        {/* Carpentry Alpha RTO*/}
        <Route
          path="/rpl-intake-cpc-30220-certificate-3-carpentry"
          element={<RPLIntakeCPC30220Carpentry />}
        />

        <Route
          path="/rpl-applicationform-cpc-30220-certificate-3-carpentry"
          element={<RPLApplicationFormCPC30220 />}
        />
        <Route
          path="/rpl-assessment-cpc-30220-certificate-3-carpentry"
          element={<RPLAssessmentCPC30220 />}
        />
        {/* Construction Concreting */}
        <Route
          path="/rpl-intake-cpc-30320-certificate-3-concreting"
          element={<RPLIntakeCPC30320Concreting />}
        />
        {/* Construction WaterProofing */}
        <Route
          path="/rpl-intake-cpc-31420-certificate-3-waterProofing"
          element={<RPLIntakeCPC31420WaterProofing />}
        />
        {/* Plumbing */}
        <Route
          path="/rpl-application-form-cpc-32420-certificate-3-plumbing"
          element={<RPLApplicationFormCPC32420Plumbing />}
        />
        <Route
          path="/rpl-self-assessment-form-cpc-32420-certificate-3-plumbing"
          element={<RPLSelfAssessmentApp />}
        />
        {/* ROOF Plumbing */}
        <Route
          path="/rpl-intake-cpc-32620-certificate-3-roofPlumbing"
          element={<RPLIntakeCPC32620RoofPlumbing />}
        />
        {/* Frontier RTO */}
        <Route
          path="/frontier-rpl-enrollment-form"
          element={<FrontierRPLEnrollmentForm />}
        />
        {/* end */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/upload-documents/:id" element={<UploadDocuments />} />

        <Route path="/rto/login" element={<RtoLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/signup" element={<AgentSignup />} />
        {/* //admin only routes  */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminSidebar />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
        </Route>
        {/* //assessor only routes */}
        <Route element={<ProtectedRoute allowedRoles={["assessor"]} />}>
          <Route path="/assessor" element={<AssessorSidebar />} />
        </Route>
        {/* //rto only routes */}
        <Route element={<ProtectedRoute allowedRoles={["rto"]} />}>
          <Route path="/rto" element={<Sidebar />} />
        </Route>
        {/* 2 step verification route */}
        <Route path="/verify-2fa" element={<TwoFactorAuth />} />
        <Route
          path="/agent/register-customer"
          element={<ScreeningFormAgent />}
        />
        <Route element={<ProtectedRoute allowedRoles={["agent"]} />}>
          <Route path="/agent" element={<MainAgentScreen />} />
        </Route>

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
