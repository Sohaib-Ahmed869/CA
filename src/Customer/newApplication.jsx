import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { useNavigate } from "react-router-dom";
import Loader from "./components/loader";
import Screen1 from "./screeningScreens/screen1";
import Screen2 from "./screeningScreens/screen2";
import StateScreen from "./screeningScreens/screen3";
import FormalEducationScreen from "./screeningScreens/screen4";
import FinalScreen from "./screeningScreens/screen5";
import certifiedAustralia from "../assets/certifiedAustralia.png";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createNewApplication } from "./Services/customerApplication";
import SpinnerLoader from "./components/spinnerLoader";
import "./stepper.css";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="w-full flex lg:ml-28 mb-10 sm:mx-auto">
      {steps.map((step, index) => (
        <div className="flex-1 flex items-center" key={index}>
          <div
            className={`w-8 h-8 rounded-full transition-all duration-1000 ${
              index <= currentStep ? "bg-primary animate-grow" : "bg-gray-300"
            } flex items-center justify-center text-white`}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-2 relative overflow-hidden transition-all duration-1000  ${
                index < currentStep ? "bg-primary animate-grow" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute left-0 top-0 h-2 w-full ${
                  index < currentStep
                    ? "bg-primary animate-fill"
                    : "bg-gray-300"
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ScreeningForm2 = () => {
  const [industry, setIndustry] = useState("");
  const [qualification, setQualification] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [locationOfExperience, setLocationOfExperience] = useState("");
  const [state, setState] = useState("");
  const [formalEducation, setFormalEducation] = useState(true);
  const [formalEducationAnswer, setFormalEducationAnswer] = useState("");
  const [userId, setUserId] = useState("");
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [type, setType] = useState("");

  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const steps = [
    "Industry & Qualification",
    "Experience & Location",
    "State",
    "Formal Education",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in, get the ID
        const id = user.uid;
        setUserId(id);
        console.log("User ID: ", id);

        setLoading(false);
      } else {
        // User is not logged in, redirect to login page
        navigate("/login");
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);
  useEffect(() => {
    console.log("Industry: ", industry);
    console.log("Qualification: ", qualification);
    console.log("Years of Experience: ", yearsOfExperience);
    console.log("Location of Experience: ", locationOfExperience);
    console.log("State: ", state);
    console.log("Formal Education: ", formalEducation);
    console.log("Formal Education Answer: ", formalEducationAnswer);
  }),
    [
      industry,
      qualification,
      yearsOfExperience,
      locationOfExperience,
      state,
      formalEducation,
      formalEducationAnswer,
    ];

  const onClickSubmit = async () => {
    setSubmissionLoading(true);
    try {
      const data = {
        industry,
        lookingForWhatQualification: qualification,
        yearsOfExperience,
        locationOfExperience,
        state,
        formal_education: formalEducation,
        qualification: formalEducationAnswer,
      };
      console.log("Data: ", data);
      const response = await createNewApplication(data, userId);
      console.log("Response: ", response);
      setSubmissionLoading(false);
      navigate("/existing-applications");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <Navbar />
      <div className="flex flex-col items-center justify-center lg:p-16 p-4 ">
        <img
          src={certifiedAustralia}
          alt="Certified Australia"
          className="mb-2"
        />
        <p className="text-sm text-gray-500 mb-4">
          Get Certified Fast - Recognise Your Skills Today!
        </p>

        {/* Stepper Component */}
        <div className="w-2/3 flex items-center justify-between">
          <Stepper steps={steps} currentStep={step} />
        </div>
        <div className="md:w-2/3 lg:w-2/3 bg-gray-100 p-2 rounded-3xl shadow-lg mt-8 w-full">
          {step === 0 && (
            <Screen1
              industry={industry}
              setIndustry={setIndustry}
              qualification={qualification}
              setQualification={setQualification}
              type={type}
              setType={setType}
            />
          )}
          {step === 1 && (
            <Screen2
              yearsOfExperience={yearsOfExperience}
              setYearsOfExperience={setYearsOfExperience}
              locationOfExperience={locationOfExperience}
              setLocationOfExperience={setLocationOfExperience}
            />
          )}
          {step === 2 && <StateScreen state={state} setState={setState} />}
          {step === 3 && (
            <FormalEducationScreen
              formalEducation={formalEducation}
              setFormalEducation={setFormalEducation}
              formalEducationAnswer={formalEducationAnswer}
              setFormalEducationAnswer={setFormalEducationAnswer}
            />
          )}

          {/* Stepper Navigation */}
          <div className="flex justify-between w-full mt-4">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="btn bg-gray-200 px-4 py-2 m-2 rounded disabled:opacity-50"
            >
              Back
            </button>
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="btn bg-primary px-4 py-2 m-2 rounded"
              >
                Next
              </button>
            ) : (
              <button
                onClick={onClickSubmit}
                className="btn bg-primary px-4 py-2 m-2 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreeningForm2;
