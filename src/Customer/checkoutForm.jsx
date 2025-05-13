// import React, { useState, useEffect } from "react";
// import { Toaster } from "react-hot-toast";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardData } from "../store/Admin/statsActions";
// import { triggerStatsRefresh } from "../utils/firestoreTriggers";

// const PaymentPage = ({
//   price,
//   applicationId,
//   setShowCheckoutModal,
//   getUserApplications,
//   userId,
//   partialScheme,
//   paid,
//   payment1,
//   payment2,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [card, setCard] = useState(null);
//   const [squareLoaded, setSquareLoaded] = useState(false);
//   const dispatch = useDispatch();
//   // Calculate price to pay based on payment scheme

//   const priceToPay = partialScheme ? (paid ? payment2 : payment1) : price;

//   useEffect(() => {
//     // Initialize Square
//     const initializeSquare = async () => {
//       if (!window.Square) {
//         const script = document.createElement("script");
//         script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
//         script.async = true;
//         document.body.appendChild(script);

//         script.onload = () => {
//           setSquareLoaded(true);
//         };
//       } else {
//         setSquareLoaded(true);
//       }
//     };

//     initializeSquare();

//     // Cleanup on unmount
//     return () => {
//       if (card) {
//         card.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     // Initialize Square Card after Square library is loaded
//     const setupCard = async () => {
//       if (squareLoaded && window.Square && !card) {
//         try {
//           const payments = window.Square.payments(
//             import.meta.env.VITE_SQUARE_APPLICATION_ID,
//             import.meta.env.VITE_SQUARE_LOCATION_ID
//           );
//           const newCard = await payments.card();
//           await newCard.attach("#card-container");
//           setCard(newCard);
//         } catch (error) {
//           console.error("Failed to load Square:", error);
//           toast.error("Failed to initialize payment form");
//         }
//       }
//     };

//     setupCard();
//   }, [squareLoaded, card]);

//   const handlePayment = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       if (!card) {
//         throw new Error("Payment form not initialized");
//       }

//       // Get payment token
//       const result = await card.tokenize();
//       if (result.status === "OK") {
//         // Process payment with token
//         const response = await fetch(
//           `${
//             import.meta.env.VITE_REACT_BACKEND_URL
//           }/api/applications/processPayment/${applicationId}`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               sourceId: result.token,
//               price: priceToPay,
//               applicationId,
//             }),
//           }
//         );

//         const data = await response.json();

//         if (data.success) {
//           toast.success("Payment successful!");
//           await getUserApplications();
//           setShowCheckoutModal(false);
//           await triggerStatsRefresh(userId);
//         } else {
//           throw new Error(data.message || "Payment failed");
//         }
//       } else {
//         throw new Error(result.errors[0].message);
//       }
//     } catch (error) {
//       console.error("Payment Error:", error);
//       toast.error(error.message || "Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto ">
//       <Toaster position="top-right" />

//       <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//         <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>

//         <div className="mb-6">
//           <p className="text-gray-600">Amount to Pay:</p>
//           <p className="text-3xl font-bold">${priceToPay}</p>
//           {partialScheme && (
//             <p className="text-sm text-gray-500 mt-1">
//               {paid ? "Final payment" : "Initial payment"}
//             </p>
//           )}
//         </div>

//         <form onSubmit={handlePayment}>
//           <div className="mb-6">
//             <label
//               htmlFor="card-container"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Card Details
//             </label>
//             <div
//               id="card-container"
//               className="border rounded-md p-1 min-h-[100px] bg-gray-50"
//             ></div>
//             {!squareLoaded && (
//               <div className="flex justify-center items-center h-20">
//                 <p className="text-gray-500">Loading payment form...</p>
//               </div>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading || !card}
//             className={`w-full py-3 px-4 rounded-md ${
//               loading || !card
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             } text-white font-medium`}
//           >
//             {loading ? "Processing..." : `Pay $${priceToPay}`}
//           </button>
//         </form>

//         <div className="mt-4 text-sm text-gray-500">
//           <p className="flex items-center mb-1">
//             <span className="mr-1">•</span> Secure payment processed by Square
//           </p>
//           <p className="flex items-center mb-1">
//             <span className="mr-1">•</span> Your payment information is
//             encrypted
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { triggerStatsRefresh } from "../utils/firestoreTriggers";
import { useNavigate } from "react-router-dom";

// Create a separate Square SDK loader that can be used across the app
const useSquareSDK = () => {
  const [sdkStatus, setSdkStatus] = useState({
    loading: true,
    loaded: false,
    error: null,
  });

  // Use refs to store Square instances to prevent recreation on re-renders
  const squareRef = useRef(null);
  const cardRef = useRef(null);

  // This flag prevents multiple initialization attempts
  const initializingRef = useRef(false);

  useEffect(() => {
    // Skip if already loaded or currently initializing
    if (squareRef.current || initializingRef.current) return;

    // Set initializing flag to prevent duplicate calls
    initializingRef.current = true;

    const loadSquareSDK = async () => {
      try {
        // First check if Square SDK is already loaded on the page
        if (window.Square) {
          squareRef.current = window.Square;
          setSdkStatus({ loading: false, loaded: true, error: null });
          return;
        }

        // Set timeout for slow connections
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(
            () => reject(new Error("Square SDK loading timed out")),
            15000
          );
        });

        // Create and load the script
        const scriptPromise = new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://web.squarecdn.com/v1/square.js";
          // script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
          script.async = true;
          script.onload = () => resolve(window.Square);
          script.onerror = () => reject(new Error("Failed to load Square SDK"));
          document.head.appendChild(script); // Append to head instead of body
        });

        // Race against timeout
        const Square = await Promise.race([scriptPromise, timeoutPromise]);
        squareRef.current = Square;
        setSdkStatus({ loading: false, loaded: true, error: null });
      } catch (error) {
        console.error("Square SDK loading failed:", error);
        setSdkStatus({ loading: false, loaded: false, error });
      } finally {
        initializingRef.current = false;
      }
    };

    loadSquareSDK();

    // Clean up function
    return () => {
      // Only destroy card instance, keep the SDK loaded
      if (cardRef.current) {
        try {
          cardRef.current.destroy();
        } catch (e) {
          console.error("Error destroying card:", e);
        }
      }
    };
  }, []);

  // Function to initialize card when needed
  const initializeCard = async (elementId) => {
    if (!squareRef.current || !elementId) return null;

    try {
      // Check if we already have a card instance
      if (cardRef.current) {
        try {
          cardRef.current.destroy();
        } catch (e) {
          console.error("Error destroying existing card:", e);
        }
      }

      // Get environment variables
      const appId = import.meta.env.VITE_SQUARE_APPLICATION_ID;
      const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;

      if (!appId || !locationId) {
        throw new Error("Square credentials are missing");
      }

      const payments = squareRef.current.payments(appId, locationId);
      const card = await payments.card();

      // Make sure the element exists before attaching
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element #${elementId} was not found`);
      }

      await card.attach(`#${elementId}`);
      cardRef.current = card;
      return card;
    } catch (error) {
      console.error("Failed to initialize Square card:", error);
      throw error;
    }
  };

  return {
    ...sdkStatus,
    initializeCard,
    card: cardRef.current,
  };
};

const PaymentPage = ({
  price,
  applicationId,
  setShowCheckoutModal,
  getUserApplications,
  userId,
  partialScheme,
  paid,
  payment1,
  payment2,
  full_paid,
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const navigate = useNavigate();
  // Calculate price to pay based on payment scheme
  const priceToPay = partialScheme ? (paid ? payment2 : payment1) : price;

  // Card element ID - use a unique ID that won't change
  const cardElementId = useRef(
    "square-card-container-" + Math.random().toString(36).substring(2, 10)
  ).current;

  // Use our custom hook for Square SDK
  const {
    loading: sdkLoading,
    loaded: sdkLoaded,
    error: sdkError,
    initializeCard,
    card,
  } = useSquareSDK();

  // Track card initialization
  const hasInitializedRef = useRef(false);

  // Create a ref for the element to track when it's mounted
  const elementMountedRef = useRef(false);

  // First effect: Track when the DOM element is actually in the document
  useEffect(() => {
    const checkElement = () => {
      const elementExists = !!document.getElementById(cardElementId);
      if (elementExists) {
        elementMountedRef.current = true;
      }
    };

    // Check immediately
    checkElement();

    // Also set up a mutation observer to detect when our element might be added
    const observer = new MutationObserver(checkElement);
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, [cardElementId]);

  // Separate initialization flag to track when initialization is complete
  const [cardInitialized, setCardInitialized] = useState(false);

  // Second effect: Initialize Square only when SDK is loaded AND element exists
  useEffect(() => {
    // Initialize card when SDK is loaded, element exists, and we haven't initialized yet
    if (
      sdkLoaded &&
      elementMountedRef.current &&
      !hasInitializedRef.current &&
      !cardInitialized
    ) {
      console.log(
        `Element check: #${cardElementId} exists:`,
        !!document.getElementById(cardElementId)
      );

      const loadCard = async () => {
        try {
          setLoading(true);

          // Double-check that the element exists right before initialization
          if (!document.getElementById(cardElementId)) {
            console.error(
              `Element #${cardElementId} not found during initialization`
            );
            setLoading(false);
            return;
          }

          await initializeCard(cardElementId);
          hasInitializedRef.current = true;
          setCardInitialized(true);
        } catch (error) {
          toast.error("Failed to initialize payment form");
          console.error("Card initialization error:", error);
        } finally {
          setLoading(false);
        }
      };

      // Call immediately if element exists
      loadCard();
    }
  }, [sdkLoaded, cardElementId, cardInitialized]);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (sdkLoading || loading || !sdkLoaded || sdkError || paymentProcessing) {
      return;
    }

    setPaymentProcessing(true);

    try {
      if (!card) {
        throw new Error("Payment form not initialized");
      }

      // Get payment token
      const result = await card.tokenize();

      if (result.status === "OK") {
        // Show processing UI
        toast.loading("Processing payment...");

        // Process payment with token
        const response = await fetch(
          `${
            import.meta.env.VITE_REACT_BACKEND_URL
          }/api/applications/processPayment/${applicationId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sourceId: result.token,
              price: priceToPay,
              applicationId,
            }),
          }
        );

        // Dismiss loading toast
        toast.dismiss();

        const data = await response.json();

        if (data.success) {
          toast.success("Payment successful!");
          await getUserApplications(userId);
          setShowCheckoutModal(false);
          await triggerStatsRefresh(userId);
          navigate("/");
        } else {
          throw new Error(data.message || "Payment failed");
        }
      } else {
        throw new Error(result.errors[0].message);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.message || "Payment failed");
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Render different UI states based on loading status
  const renderCardContainer = () => {
    if (sdkError) {
      return (
        <div className="border rounded-md p-4 min-h-[100px] bg-gray-50 flex flex-col items-center justify-center">
          <p className="text-red-500 mb-2">Failed to load payment form</p>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      );
    }

    // Always render the container div, but show a loading overlay when needed
    return (
      <div className="relative mb-6">
        <div
          id={cardElementId}
          className="border rounded-md p-4 min-h-[100px] bg-gray-50"
        ></div>

        {/* Loading overlay - only show if still loading and not initialized */}
        {(sdkLoading || (loading && !cardInitialized)) && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center rounded-md">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-gray-700">Loading payment form...</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Toaster position="top-right" />

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>

        <div className="mb-6">
          <p className="text-gray-600">Amount to Pay:</p>
          <p className="text-3xl font-bold">${priceToPay}</p>
          {partialScheme && (
            <p className="text-sm text-gray-500 mt-1">
              {paid ? "Final payment" : "Initial payment"}
            </p>
          )}
        </div>

        <form onSubmit={handlePayment}>
          {/* Render card container based on state */}
          {renderCardContainer()}

          <button
            type="submit"
            disabled={
              sdkLoading ||
              (loading && !cardInitialized) ||
              !sdkLoaded ||
              sdkError ||
              paymentProcessing ||
              !card
            }
            className={`w-full py-2 px-4 rounded ${
              sdkLoading ||
              (loading && !cardInitialized) ||
              !sdkLoaded ||
              sdkError ||
              paymentProcessing ||
              !card
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium`}
          >
            {paymentProcessing
              ? "Processing..."
              : sdkLoading || (loading && !cardInitialized)
              ? "Loading..."
              : `Pay ${priceToPay}`}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-500">
          <p>• Secure payment processed by Square</p>
          <p>• Your payment information is encrypted</p>
          <p>• Enter your card details above to complete payment</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
