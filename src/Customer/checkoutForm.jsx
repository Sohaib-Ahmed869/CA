// import React, { useState, useEffect } from "react";
// import {
//   getApplications,
//   paymentProcessing,
// } from "./Services/customerApplication";
// import toast from "react-hot-toast";
// import { Toaster } from "react-hot-toast";

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
//   full_paid,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [card, setCard] = useState(null);

//   // Calculate price to pay based on payment scheme
//   const pricetoPay = partialScheme ? (paid ? payment2 : payment1) : price;

//   useEffect(() => {
//     // Initialize Square
//     const initializeSquare = async () => {
//       if (!window.Square) {
//         const script = document.createElement("script");
//         script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
//         script.async = true;
//         document.body.appendChild(script);

//         script.onload = async () => {
//           if (window.Square) {
//             try {
//               const payments = window.Square.payments(
//                 import.meta.env.VITE_SQUARE_APPLICATION_ID,
//                 import.meta.env.VITE_SQUARE_LOCATION_ID
//               );
//               const card = await payments.card();
//               await card.attach("#card-container");
//               setCard(card);
//             } catch (error) {
//               console.error("Failed to load Square:", error);
//               toast.error("Failed to initialize payment form");
//             }
//           }
//         };
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
//               price: pricetoPay,
//               applicationId,
//             }),
//           }
//         );

//         const data = await response.json();

//         if (data.success) {
//           toast.success("Payment successful!");
//           await getUserApplications();
//           // await getApplications(userId);

//           setShowCheckoutModal(false);
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
//     <div className="w-full max-w-md mx-auto p-4">
//       <Toaster position="top-right" />

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>

//         <div className="mb-6">
//           <p className="text-gray-600">Amount to Pay:</p>
//           <p className="text-3xl font-bold">${pricetoPay}</p>
//           {partialScheme && (
//             <p className="text-sm text-gray-500 mt-1">
//               {paid ? "Final payment" : "Initial payment"}
//             </p>
//           )}
//         </div>

//         <form onSubmit={handlePayment}>
//           {/* Square Card Input */}
//           <div
//             id="card-container"
//             className="mb-6 border rounded-md p-4 min-h-[100px] bg-gray-50"
//           ></div>

//           <button
//             type="submit"
//             disabled={loading || !card}
//             className={`w-full py-2 px-4 rounded ${
//               loading || !card
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             } text-white font-medium`}
//           >
//             {loading ? "Processing..." : `Pay $${pricetoPay}`}
//           </button>
//         </form>

//         <div className="mt-4 text-sm text-gray-500">
//           <p>• Secure payment processed by Square</p>
//           <p>• Your payment information is encrypted</p>
//           <p>• Enter your card details above to complete payment</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../store/Admin/statsActions";

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
}) => {
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(null);
  const [squareLoaded, setSquareLoaded] = useState(false);
  const dispatch = useDispatch();
  // Calculate price to pay based on payment scheme
  const AdminUserId = import.meta.env.VITE_ADMIN_USER_ID;

  const priceToPay = partialScheme ? (paid ? payment2 : payment1) : price;

  useEffect(() => {
    // Initialize Square
    const initializeSquare = async () => {
      if (!window.Square) {
        const script = document.createElement("script");
        script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          setSquareLoaded(true);
        };
      } else {
        setSquareLoaded(true);
      }
    };

    initializeSquare();

    // Cleanup on unmount
    return () => {
      if (card) {
        card.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Initialize Square Card after Square library is loaded
    const setupCard = async () => {
      if (squareLoaded && window.Square && !card) {
        try {
          const payments = window.Square.payments(
            import.meta.env.VITE_SQUARE_APPLICATION_ID,
            import.meta.env.VITE_SQUARE_LOCATION_ID
          );
          const newCard = await payments.card();
          await newCard.attach("#card-container");
          setCard(newCard);
        } catch (error) {
          console.error("Failed to load Square:", error);
          toast.error("Failed to initialize payment form");
        }
      }
    };

    setupCard();
  }, [squareLoaded, card]);

  const handlePayment = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!card) {
        throw new Error("Payment form not initialized");
      }

      // Get payment token
      const result = await card.tokenize();
      if (result.status === "OK") {
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

        const data = await response.json();

        if (data.success) {
          toast.success("Payment successful!");
          await getUserApplications();
          setShowCheckoutModal(false);
          console.log("adminUSERiD", AdminUserId);
          await dispatch(fetchDashboardData(AdminUserId));
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
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto ">
      <Toaster position="top-right" />

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
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
          <div className="mb-6">
            <label
              htmlFor="card-container"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Card Details
            </label>
            <div
              id="card-container"
              className="border rounded-md p-1 min-h-[100px] bg-gray-50"
            ></div>
            {!squareLoaded && (
              <div className="flex justify-center items-center h-20">
                <p className="text-gray-500">Loading payment form...</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !card}
            className={`w-full py-3 px-4 rounded-md ${
              loading || !card
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium`}
          >
            {loading ? "Processing..." : `Pay $${priceToPay}`}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-500">
          <p className="flex items-center mb-1">
            <span className="mr-1">•</span> Secure payment processed by Square
          </p>
          <p className="flex items-center mb-1">
            <span className="mr-1">•</span> Your payment information is
            encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
