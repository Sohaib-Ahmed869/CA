import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import SpinnerLoader from "../Customer/components/spinnerLoader";
import { Toaster } from "react-hot-toast";
import login from "../assets/login.png";
import { MdEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import certifiedAustralia from "../assets/certifiedAustraliaBlack.png";
import Footer from "../Customer/components/footer";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const notify = () => toast.success("Login Successful");
  const notifyError = (message) => toast.error(message);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmissionLoading(true);

    setError(""); // Reset error

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().role === "admin") {
          localStorage.setItem("role", "admin");
          const idToken = await user.getIdToken();
          notify();
          setSubmissionLoading(false);
          navigate("/admin");
        } else if (userDoc.exists() && userDoc.data().role === "customer") {
          localStorage.setItem("role", "customer");
          const idToken = await user.getIdToken();
          notify();
          setSubmissionLoading(false);
          navigate("/");
        } else if (userDoc.exists() && userDoc.data().role === "rto") {
          localStorage.setItem("role", "rto");
          localStorage.setItem("rtoType", userDoc.data().type);
          console.log(userDoc.data().type);
          const idToken = await user.getIdToken();
          notify();
          setSubmissionLoading(false);
          navigate("/rto");
        } else if (userDoc.exists() && userDoc.data().role === "agent") {
          localStorage.setItem("role", "agent");
          const idToken = await user.getIdToken();
          notify();
          setSubmissionLoading(false);
          navigate("/agent");
        } else {
          await auth.signOut();
          notifyError("Access denied: Registered users only");
          setSubmissionLoading(false);
        }
      })
      .catch((err) => {
        setSubmissionLoading(false);
        setError("Invalid email or password");
        console.error("Login error:", err);
        notifyError("Invalid email or password");
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center  h-screen">
        <img
          src={certifiedAustralia}
          alt="Certified Australia"
          className="h-24 mt-4 cursor-pointer"
          onClick={() => {
            window.location.href = "https://certifiedaustralia.com.au/";
          }}
        />
        <Toaster />
        <div className="flex flex-col items-center justify-center lg:mt-20 bg-white p-8 rounded-lg shadow-xl md:w-1/2 lg:w-1/4 hover:scale-105 transition-transform duration-300">
          <img src={login} alt="Login" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-500 mb-4">Login today to get certified</p>
          <form onSubmit={handleLogin} className="flex flex-col w-full">
            <div className="flex items-center border p-2 rounded-lg mb-4">
              <MdEmail className="text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                className="w-full ml-2 border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center border p-2 rounded-lg mb-4">
              <BiLock className="text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                className="w-full ml-2 focus:border-none border-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary text-white p-2 rounded-lg font-semibold"
            >
              {submissionLoading ? (
                <FaSpinner className="animate-spin text-white text-2xl" />
              ) : (
                "Login"
              )}
            </button>
            <p className="text-gray-500 mt-2 text-sm text-center">
              Don't have an account?{" "}
              <a href="/screening" className="text-blue-500">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
