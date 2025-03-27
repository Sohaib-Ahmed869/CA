import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const DirectDebitCheckout = ({
  applicationId,
  setShowDirectDebitModal,
  setOpenPaymentModal,
  userId,
  paymentAmount,
  paymentDeadline,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(null);

  useEffect(() => {
    let script;
    const initializeSquare = async () => {
      if (!window.Square) {
        script = document.createElement("script");
        script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = async () => {
          if (window.Square) {
            try {
              const payments = window.Square.payments(
                import.meta.env.VITE_SQUARE_APPLICATION_ID, // Changed from process.env
                import.meta.env.VITE_SQUARE_LOCATION_ID // Changed from process.env
              );

              const card = await payments.card();
              await card.attach("#direct-debit-card-container");
              setCard(card);
            } catch (error) {
              console.error("Failed to load Square:", error);
              toast.error("Failed to initialize payment form");
            }
          }
        };
      } else {
        // Reuse existing Square instance
        const payments = window.Square.payments(
          import.meta.env.VITE_SQUARE_APPLICATION_ID,
          import.meta.env.VITE_SQUARE_LOCATION_ID
        );
        const card = await payments.card();
        await card.attach("#direct-debit-card-container");
        setCard(card);
      }
    };

    initializeSquare();

    return () => {
      if (card) {
        card.destroy();
      }
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleDirectDebitSetup = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!card) throw new Error("Payment form not initialized");

      const result = await card.tokenize();
      if (result.status === "OK") {
        const response = await fetch(
          `${
            import.meta.env.VITE_REACT_BACKEND_URL
          }/api/applications/setupDirectDebit/${applicationId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sourceId: result.token,
              paymentAmount: Number(paymentAmount),
              paymentDeadline,
              userId,
            }),
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (data.success) {
          toast.success("Automatic payment setup successful!");
          onSuccess(); // Notify parent component
          setShowDirectDebitModal(false);
          setOpenPaymentModal(true);
        } else {
          throw new Error(data.message || "Direct debit setup failed");
        }
      } else {
        throw new Error(
          result.errors?.[0]?.message || "Payment tokenization failed"
        );
      }
    } catch (error) {
      console.error("Direct Debit Error:", error);
      toast.error(error.message || "Failed to setup automatic payments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-md mx-auto p-4">
        <Toaster position="top-right" />
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <button
            onClick={() => {
              setShowDirectDebitModal(false);
              setOpenPaymentModal(true);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          <h2 className="text-xl font-semibold mb-4">
            Automatic Payment Setup
          </h2>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Amount:</span>
              <span className="text-2xl font-bold">${paymentAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Scheduled Date:</span>
              <span className="text-sm text-red-600">
                {new Date(paymentDeadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <form onSubmit={handleDirectDebitSetup}>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  I authorize automatic payments of ${paymentAmount} on{" "}
                  {new Date(paymentDeadline).toLocaleDateString()}
                </span>
              </label>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Secure card details:</p>
              <div
                id="direct-debit-card-container"
                className="border rounded-md p-4 min-h-[100px] bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !card}
              className={`w-full py-3 px-6 rounded-lg transition-all ${
                loading || !card
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">🌀</span>
                  Authorizing...
                </span>
              ) : (
                "Save Payment Method"
              )}
            </button>
          </form>

          <div className="mt-6 text-xs text-gray-500 space-y-2">
            <p>🔒 Payments processed securely by Square</p>
            <p>⏰ Reminders sent 3 days before payment date</p>
            <p>🔄 Update/cancel anytime in account settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectDebitCheckout;
