import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import certifiedAustralia from "../../assets/certifiedAustralia.png";
import { CiSettings } from "react-icons/ci";
import Modal from "./modal";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [isUpdatePhoneOpen, setIsUpdatePhoneOpen] = useState(false);
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);

  // Check auth state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set logged-in state based on user presence
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // Redirect to login page after logout
  };

  // Update Phone Function

  return (
    <>
      <div className="navbar fixed top-4 left-1/2 transform -translate-x-1/2 z-10 shadow-lg bg-secondary backdrop-blur-lg rounded-2xl px-6 py-3 flex justify-between items-center w-[90%] max-w-2xl bg-opacity-90">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={certifiedAustralia}
            alt="Certified Australia Logo"
            className="h-12 mr-4"
          />
        </div>
        <div>
          {isLoggedIn ? (
            <div className="relative flex items-center gap-2">
              <CiSettings
                className="text-white cursor-pointer text-2xl"
                onClick={() => {
                  setSettingsMenu(!settingsMenu);
                }}
              />
              {settingsMenu && (
                <div className="absolute left-2 top-4 mt-2 bg-white shadow-lg rounded-lg py-2 w-48">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      setSettingsMenu(false);
                      setIsUpdateEmailOpen(true);
                    }}
                  >
                    Update Email
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      setSettingsMenu(false);
                      setIsUpdatePhoneOpen(true);
                    }}
                  >
                    Update Phone
                  </button>
                </div>
              )}
              <button
                className="btn btn-primary btn-sm border-0 text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm border-0 text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
      {/* Update Phone Modal */}
      {isUpdateEmailOpen || isUpdatePhoneOpen ? (
        <Modal
          isUpdateEmailOpen={isUpdateEmailOpen}
          setIsUpdateEmailOpen={setIsUpdateEmailOpen}
          setIsUpdatePhoneOpen={setIsUpdatePhoneOpen}
          isUpdatePhoneOpen={isUpdatePhoneOpen}
        />
      ) : null}
    </>
  );
};

export default Navbar;
