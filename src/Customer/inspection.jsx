import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { useNavigate } from "react-router-dom";
import Loader from "./components/loader";
import Screen1 from "./screeningScreens/screen1";
import Screen2 from "./screeningScreens/screen2";
import StateScreen from "./screeningScreens/screen3";
import FormalEducationScreen from "./screeningScreens/screen4";
import FinalScreen from "./screeningScreens/screen5";
import certifiedAustralia from "../assets/certifiedAustraliaBlack.png";
import { register } from "./Services/authService";
import { doc, getDoc } from "firebase/firestore";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { db } from "../firebase";
import { auth } from "../firebase";
import SpinnerLoader from "./components/spinnerLoader";
import { signInWithEmailAndPassword } from "firebase/auth";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

import "./stepper.css";
import { fetchDashboardData } from "../store/Admin/statsActions";
import { useDispatch, useSelector } from "react-redux";

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

const ScreeningForm = () => {
  const [industry, setIndustry] = useState("");
  const [password, setPassword] = useState("");
  const [qualification, setQualification] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [locationOfExperience, setLocationOfExperience] = useState("");
  const [state, setState] = useState("");
  const [formalEducation, setFormalEducation] = useState("");
  const [formalEducationAnswer, setFormalEducationAnswer] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [questions, setQuestions] = useState("");
  const [toc, setToc] = useState(false);
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [expense, setexpense] = useState(0);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(state.adminDashboardStats.userId);

  const navigate = useNavigate();
  useEffect(() => {
    //send data to server
    console.log(
      industry,
      qualification,
      yearsOfExperience,
      locationOfExperience,
      state,
      formalEducation,
      formalEducationAnswer,
      firstName,
      lastName,
      phone,
      email,
      country,
      questions,
      toc,
      password,
      type,
      price,
      expense
    );
  }, [
    industry,
    qualification,
    yearsOfExperience,
    locationOfExperience,
    state,
    formalEducation,
    formalEducationAnswer,
    firstName,
    lastName,
    phone,
    email,
    country,
    questions,
    toc,
    password,
    expense,
  ]);

  const [step, setStep] = useState(0);

  useEffect(() => {
    console.log(step);
  }, [step]);

  const notifyError = (message) => toast.error(message);

  // const navigate = useNavigate();
  const handleNext = () => {
    if ((step === 0 && industry === "") || qualification === "") {
      toast.error("Please fill in the required fields");
      return;
    }

    if (
      step === 1 &&
      (yearsOfExperience === "" || locationOfExperience === "")
    ) {
      toast.error("Please fill in the required fields");
      return;
    }

    if (step === 2 && state === "") {
      toast.error("Please select an option");
      return;
    }
    if (step === 3 && formalEducation.length === 0) {
      toast.error("Please Select an option");
      return;
    }
    if (
      step === 3 &&
      formalEducation === "Yes" &&
      formalEducationAnswer.length === 0
    ) {
      toast.error("Please fill in the required fields");
      return;
    }

    setStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?!.*\s).+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onClickSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return notifyError("Password must be at least 6 characters long");
    }
    if (!passwordRegex.test(password)) {
      return notifyError(
        "Password must include at least one capital letter, one alphanumeric character, and no spaces."
      );
    }

    //send data to server
    setSubmissionLoading(true);
    if (!email || !password) {
      setSubmissionLoading(false);
      return notifyError("Please fill in all fields");
    }
    if (!emailRegex.test(email)) {
      setSubmissionLoading(false);
      return notifyError("Invalid email address");
    }

    if (!email.includes("@" || ".")) {
      setSubmissionLoading(false);
      return notifyError("Invalid email address");
    }

    if (!toc) {
      setSubmissionLoading(false);
      return notifyError("Please agree to the terms and conditions");
    }

    if (!firstName || !lastName || !phone || !country) {
      setSubmissionLoading(false);
      return notifyError("Please fill in all fields");
    }

    try {
      console.log("Country value before submission:", country);
      const response = await register(
        industry,
        qualification,
        expense,
        yearsOfExperience,
        locationOfExperience,
        state,
        formalEducation,
        formalEducationAnswer,
        firstName,
        lastName,
        phone,
        email,
        country,
        questions,
        toc,
        password,
        type,
        price
      );
      console.log(response);
      setSubmissionLoading(false);
      await dispatch(fetchDashboardData(userId, "reset"));
      if (response) {
        setIsDialogOpen(true);
      }
    } catch (err) {
      setSubmissionLoading(false);
      alert("Error submitting application");
      console.error(err);
    }
  };
  const [loading, setLoading] = React.useState(false);

  const steps = [
    "Industry & Qualification",
    "Experience & Location",
    "State",
    "Formal Education",
    "Final Details",
  ];

  // const onClickDashboard = async (e) => {
  //   //login user
  //   e.preventDefault();
  //   setSubmissionLoading(true);
  //   try {
  //     // Sign in with Firebase Auth
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     //check what is user role must be customer
  //     const user = userCredential.user;

  //     // Fetch the user's role from Firestore
  //     const userDocRef = doc(db, "users", user.uid); // Assuming you store user roles in Firestore under 'users' collection
  //     const userDoc = await getDoc(userDocRef);
  //     const idToken = await user.getIdToken();

  //     if (userDoc.data().role !== "customer") {
  //       console.log(userDoc.data().role);
  //       setSubmissionLoading(false);
  //       alert("Invalid email or password");
  //       return;
  //     }
  //     const response = await fetch(`${URL}/api/auth/login`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ idToken }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Login failed");
  //     }
  //     const userData = userDoc.data();
  //     const data = await response.json();
  //     localStorage.setItem("usertoken", data.token);
  //     localStorage.setItem("jwtToken", data.token);
  //     localStorage.removeItem("2faPending");
  //     localStorage.setItem("role", userData.role);

  //     setSubmissionLoading(false);

  //     // Redirect to dashboard
  //     navigate("/");
  //   } catch (err) {
  //     alert("Invalid email or password");
  //     console.error("Login error:", err);

  //     setSubmissionLoading(false);
  //   }
  // };
  const onClickDashboard = async (e) => {
    e.preventDefault();

    // Validate password length before submission

    setSubmissionLoading(true);

    try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestore user data retrieval
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User account not found");
      }

      const userData = userDoc.data();

      // API authentication
      const idToken = await user.getIdToken();
      const response = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Authentication failed");
      }

      // Handle successful login
      const data = await response.json();
      localStorage.setItem("usertoken", data.token);
      localStorage.setItem("jwtToken", data.token);
      localStorage.removeItem("2faPending");
      localStorage.setItem("role", userData.role);

      toast.success("Login successful! Redirecting...");
      navigate("/");
    } catch (err) {
      // Handle specific error cases
      let errorMessage = "Login failed. Please try again.";

      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "Account disabled";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Invalid email or password";
          break;
        default:
          if (err.message.includes("valid email")) {
            errorMessage = "Please enter a valid email address";
          } else if (err.message) {
            errorMessage = err.message;
          }
      }

      toast.error(errorMessage);
      console.error("Login error:", err);
    } finally {
      setSubmissionLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="top right" />
      <Navbar />
      <div className="flex flex-col items-center justify-center lg:p-16 p-4 mt-28">
        <img
          src={certifiedAustralia}
          alt="Certified Australia"
          className="mb-2 h-28"
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
              price={price}
              setPrice={setPrice}
              setexpense={setexpense}
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
          {step === 4 && (
            <FinalScreen
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              country={country}
              setCountry={setCountry}
              questions={questions}
              setQuestions={setQuestions}
              toc={toc}
              setToc={setToc}
              password={password}
              setPassword={setPassword}
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
            {step === 4 ? (
              <button
                onClick={onClickSubmit}
                className="btn btn-primary text-white px-4 py-2 m-2 rounded"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={step === 4}
                className="btn btn-primary text-white px-4 py-2 m-2 rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      {
        //overlay
        isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
        )
      }
      {isDialogOpen && (
        <dialog className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Assessment Submitted Successfully!
            </h3>
            <p className="py-4">
              Your fast skills assessment has been submitted successfully.
              Please visit the dashboard to view your application.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-primary text-white"
                onClick={onClickDashboard}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ScreeningForm;
