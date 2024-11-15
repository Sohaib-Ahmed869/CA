import React, { useState } from "react";
import Navbar from "./components/navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import certifcation from "../assets/certification.jpg";
import login from "../assets/login.png";
import toast, { Toaster } from "react-hot-toast";
import SpinnerLoader from "./components/spinnerLoader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const notify = () => toast.success("Login Successful");
  const notifyError = () => toast.error("Invalid email or password");

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    setError(""); // Reset error

    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //check what is user role must be customer
      const user = userCredential.user;

      // Fetch the user's role from Firestore
      const userDocRef = doc(db, "users", user.uid); // Assuming you store user roles in Firestore under 'users' collection
      const userDoc = await getDoc(userDocRef);

      if (userDoc.data().role !== "customer") {
        console.log(userDoc.data().role);
        setSubmissionLoading(false);
        setError("Invalid email or password");
        notifyError();
        return;
      }

      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      notify();
      setSubmissionLoading(false);

      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err);

      notifyError();
      setSubmissionLoading(false);
    }
  };

  return (
    <div className="login-container">
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex flex-col lg:flex-row">
        <div className="w-1/2 min-h-screen hidden lg:block">
          <img
            src={certifcation}
            alt="certification"
            className="object-cover h-full w-full"
            onClick={() => navigate("https://certifiedaustralia.com.au/")}
          />
        </div>
        <div className="p-5 lg:p-20 mx-auto lg:w-1/2 min-h-screen flex flex-col justify-center ">
          <div className="w-full flex flex-col items-start">
            <img src={login} alt="login" className="object-cover h-32" />

            <p className="text-gray-600 mb-5">
              Welcome back! Please login to your account.
            </p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="input mb-5 input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input mb-5 input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label>Remember me</label>
              </div>
              <a href="/forgot-password" className="text-primary">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="btn btn-primary w-full text-white">
              Login
            </button>
            <p className="text-center mt-5">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
