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
import RPLSelfAssessmentApp from "./Customer/AdditionalForms/Plumbing/self-Assessment-plumbing-cpc-32420";
import RPLIntakeCPC32620RoofPlumbing from "./Customer/AdditionalForms/RoofPlumbing/rpl-Intake-CPC32620-CertificateIII-inRoofPlumbing";
import RPLEnrolment from "./Customer/AdditionalForms/RPLEnrollment/RPLEnrollmentForm";
import RPLApplicationFormCPC31020 from "./Customer/AdditionalForms/solidPlastering/rpl-application-form-cpc-31020";
import RPLIntakeCPC31020 from "./Customer/AdditionalForms/solidPlastering/RPLIntakeCPC31020";
import RPLIntakeCPC40120 from "./Customer/AdditionalForms/BuildingAndConstruction/RPLIntakeCPC40120";
import RPLApplicationFormCPC40120 from "./Customer/AdditionalForms/BuildingAndConstruction/RPLApplicationFormCPC40120";
import RPLIntakeForm from "./Customer/AdditionalForms/RPLIntakeTemplate/RPLIntakeForm";
import {
  RPLApplicationFormData,
  RPLIntakeData,
} from "./Customer/AdditionalForms/CompetenciesData";
import ThirdPartyEvidenceKit from "./Customer/AdditionalForms/Carpentry/thirdPartyEvidenceKit";
import RPLApplicationFormCPC30620 from "./Customer/AdditionalForms/BilalForms/RPLApplicationFormCPC30620";
import RPLApplicationFormCPC40920 from "./Customer/AdditionalForms/MaryamForms/form2";
import RPLThirdPartyCPC40920 from "./Customer/AdditionalForms/MaryamForms/form5";
import RPLSelfAssessmentCPC40920 from "./Customer/AdditionalForms/BilalForms/RPLSelfAssessmentCPC40920";
import ThirdPartyEvidenceKitA from "./Customer/AdditionalForms/BilalForms/ThirdPartyEvidenceKit";
import RPLAssessmentCPC30220A from "./Customer/AdditionalForms/MaryamForms/form4";
import FORM4 from "./Customer/AdditionalForms/MaryamForms/form4";
import DocumentModal from "./Customer/components/viewDocsModal";
import RPLSelfAssessmentFormCPC30220 from "./Customer/AdditionalForms/Carpentry/RPLSelfAssessmentFormCPC30220";
import RPL2 from "./Customer/AdditionalForms/CarpentryAssesmentkitForm/RPL22";

import RPLSelfAssessment2CPC30620A from "./Customer/FormsTOVerify/Bilals/4";
import RPLAssessmentCPC31020b from "./Customer/FormsTOVerify/Maryams/1";
import RPLAssessmentFormaaa from "./Customer/FormsTOVerify/Maryams/2";
import RPLAssessmentCPC30220cccc from "./Customer/FormsTOVerify/Maryams/3";
import RPLSelfAssessmentCPC40920e from "./Customer/FormsTOVerify/Bilals/5";
import RPLSelfAssessmentForm40120ff from "./Customer/FormsTOVerify/Bilals/6";
import RPLSelfAssessmentFormCPC30220k from "./Customer/FormsTOVerify/Bilals/7";
import FormNavigation from "./Customer/FormsTOVerify/verify";
function App() {
  return (
    <Router>
      <Routes>
        {/* Test Bilal Forms */}
        {/* <Route path="/bilal-form" element={<RPL />} /> */}
        <Route path="/maryam-form" element={<RPLApplicationFormCPC40920 />} />
        <Route
          path="/view-doc"
          element={
            <DocumentModal
              isOpen={true}
              docLink={
                "https://firebasestorage.googleapis.com/v0/b/testca-e3e5e.firebasestorage.app/o/qat7MrFzrpTnQo0oYs0ZV7JsqWu2%2Frpl_intake_form_1gZAvZ4sATfwRNoI184L.pdf?alt=media&token=c816e79d-74ab-4160-806c-cad327d9a102"
              }
            />
          }
        />

        {/* end */}
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

        {/* RPL INTAKE */}
        <Route
          path="/rpl-intake-CPC31420-certificate-3-waterProofing/:applicationId"
          element={
            <RPLIntakeForm
              qualificationName={RPLIntakeData.CPC31420.qualification}
              competencies={RPLIntakeData.CPC31420.competencies}
            />
          }
        />
        <Route
          path="/rpl-intake-CPC30320-certificate-3-concreting/:applicationId"
          element={
            <RPLIntakeForm
              qualificationName={RPLIntakeData.CPC30320.qualification}
              competencies={RPLIntakeData.CPC30320.competencies}
            />
          }
        />
        <Route
          path="/rpl-intake-CPC30220-certificate-3-carpentry/:applicationId"
          element={
            <RPLIntakeForm
              qualificationName={RPLIntakeData.CPC30220.qualification}
              competencies={RPLIntakeData.CPC30220.competencies}
            />
          }
        />
        <Route
          path="/rpl-intake-CPC40920-certificate-IV-Plumbing-and-Services/:applicationId"
          element={
            <RPLIntakeForm
              qualificationName={RPLIntakeData.CPC40920.qualification}
              competencies={RPLIntakeData.CPC40920.competencies}
            />
          }
        />
        <Route
          path="/rpl-intake-CPC50220-Diploma-of-Building-and-Construction-(Building)/:applicationId"
          element={
            <RPLIntakeForm
              qualificationName={RPLIntakeData.CPC50220.qualification}
              competencies={RPLIntakeData.CPC50220.competencies}
            />
          }
        />
        <Route
          path="/rpl-intake-CPC30620-certificate-III-Painting-and-Decorating/:applicationId"
          element={
            <RPLIntakeForm
              qualificationName={RPLIntakeData.CPC30620.qualification}
              competencies={RPLIntakeData.CPC30620.competencies}
            />
          }
        />
        <Route
          path="/rpl-intake-CPC40120-certificate-IV-building-and-construction/:applicationId"
          element={
            <RPLIntakeForm
              qualificationName={RPLIntakeData.CPC40120.qualification}
              competencies={RPLIntakeData.CPC40120.competencies}
            />
          }
        />
        <Route
          path="/rpl-intake-CPC31020-certificate-III-solid-plastering/:applicationId"
          element={
            <RPLIntakeForm
              qualificationName={RPLIntakeData.CPC31020.qualification}
              competencies={RPLIntakeData.CPC31020.competencies}
            />
          }
        />
        <Route
          path="/rpl-intake-CPC32620-certificate-III-roof-plumbing/:applicationId"
          element={
            <RPLIntakeForm
              qualificationName={RPLIntakeData.CPC32620.qualification}
              competencies={RPLIntakeData.CPC32620.competencies}
            />
          }
        />
        <Route
          path="/rpl-intake-CPC32420-certificate-III-plumbing/:applicationId"
          element={
            <RPLIntakeForm
              qualificationName={RPLIntakeData.CPC32420.qualification}
              competencies={RPLIntakeData.CPC32420.competencies}
            />
          }
        />
        {/* RPL APPLICATION FORMS */}
        <Route
          path="/rpl-applicationform-CPC30820-certificate-3-Roof-Tiling/:applicationId"
          element={
            <RPLApplicationFormCPC30220
              programQualification={
                RPLApplicationFormData.CPC30820.programQualification
              }
              title={RPLApplicationFormData.CPC30820.title}
            />
          }
        />
        <Route
          path="/rpl-applicationform-CPC30620-certificate-3-painting-decorating/:applicationId"
          element={
            <RPLApplicationFormCPC30220
              programQualification={
                RPLApplicationFormData.CPC30620.programQualification
              }
              title={RPLApplicationFormData.CPC30620.title}
            />
          }
        />

        <Route
          path="/rpl-applicationform-CPC40920-certificate-IV-plumbing-services-hydraulicServiceDesign/:applicationId"
          element={
            <RPLApplicationFormCPC30220
              programQualification={
                RPLApplicationFormData.CPC40920Hydraulic.programQualification
              }
              title={RPLApplicationFormData.CPC40920Hydraulic.title}
            />
          }
        />
        <Route
          path="/rpl-applicationform-CPC40920-certificate-IV-plumbing-services-hydraulicServiceDesign/:applicationId"
          element={
            <RPLApplicationFormCPC30220
              programQualification={
                RPLApplicationFormData.CPC40920Operations.programQualification
              }
              title={RPLApplicationFormData.CPC40920Operations.title}
            />
          }
        />
        <Route
          path="/rpl-applicationform-CPC40120-certificate-IV-building-and-construction/:applicationId"
          element={
            <RPLApplicationFormCPC30220
              programQualification={
                RPLApplicationFormData.CPC40120.programQualification
              }
              title={RPLApplicationFormData.CPC40120.title}
            />
          }
        />
        <Route
          path="/rpl-applicationform-CPC31020-certificate-3-solid-plastering/:applicationId"
          element={
            <RPLApplicationFormCPC30220
              programQualification={
                RPLApplicationFormData.CPC31020.programQualification
              }
              title={RPLApplicationFormData.CPC31020.title}
            />
          }
        />
        <Route
          path="/rpl-applicationform-CPC32420-certificate-3-plumbing/:applicationId"
          element={
            <RPLApplicationFormCPC30220
              programQualification={
                RPLApplicationFormData.CPC32420.programQualification
              }
              title={RPLApplicationFormData.CPC32420.title}
            />
          }
        />
        <Route
          path="/rpl-applicationform-CPC30220-certificate-3-carpentry/:applicationId"
          element={
            <RPLApplicationFormCPC30220
              programQualification={
                RPLApplicationFormData.CPC30220.programQualification
              }
              title={RPLApplicationFormData.CPC30220.title}
            />
          }
        />

        {/* RPL Enrollment kit */}
        <Route
          path="/rpl-enrollment-kit/:applicationId"
          element={<RPLEnrolment />}
        />

        {/* CIBT */}
        <Route path="/cibt-enrollment-form" element={<EnrollmentForm />} />
        <Route
          path="/cibt-entry-interview-form"
          element={<EntryInterviewForm />}
        />
        <Route path="/lln-assessment" element={<LLNAssessment />} />

        {/* Application Forms */}

        <Route
          path="/rpl-intake-cpc-31320-certificate-3-wall-and-floor-tiling"
          element={<RPLIntakeCPC31320WallFloorTiling />}
        />
        {/* Carpentry Alpha RTO*/}

        <Route
          path="/rpl-self-assessment-cpc-30220-certificate-3-carpentry/:applicationId"
          element={<RPL2 />}
        />

        <Route
          path="/rpl-evidence-kit-carpentry"
          element={<ThirdPartyEvidenceKit />}
        />
        {/* Construction Concreting */}
        <Route
          path="/rpl-intake-cpc-30320-certificate-3-concreting"
          element={<RPLIntakeCPC30320Concreting />}
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
        {/* Solid Plastering */}
        <Route
          path="/rpl-application-form-cpc-31020-certificate-3-solidPlastering"
          element={<RPLApplicationFormCPC31020 />}
        />
        <Route
          path="/rpl-intake-cpc-31020-certificate-3-solidPlastering"
          element={<RPLIntakeCPC31020 />}
        />
        {/*Building and construction */}
        <Route
          path="/rpl-intake-cpc-40120-certificate-IV-building-and-construction"
          element={<RPLIntakeCPC40120 />}
        />
        <Route
          path="/rpl-application-form-cpc-41020-certificate-IV-building-and-construction"
          element={<RPLApplicationFormCPC40120 />}
        />

        {/* Painting and Decorating */}

        {/* "CPC50220-Diploma of Building and Construction (Building) */}

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

        {/* Forms to Verify */}

        {/* maryam */}
        <Route path="/form-maryam-1" element={<RPLAssessmentCPC31020b />} />
        <Route path="/form-maryam-2" element={<RPLAssessmentFormaaa />} />
        <Route path="/form-maryam-3" element={<RPLAssessmentCPC30220cccc />} />

        {/* Bilal */}

        <Route path="/form-bilal-1" element={<RPLSelfAssessment2CPC30620A />} />
        <Route path="/form-bilal-2" element={<RPLSelfAssessmentCPC40920e />} />
        <Route
          path="/form-bilal-3"
          element={<RPLSelfAssessmentForm40120ff />}
        />
        <Route path="/form-bilal-4" element={<RPL2 />} />
        <Route path="/verify-forms" element={<FormNavigation />} />
      </Routes>
    </Router>
  );
}

export default App;
