import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import {
  paymentProcessing,
  markApplicationAsPaid,
} from "./Services/customerApplication";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51OpbgVEUOaf2osppFuZpU9bkzw5Lml8DnipRkYfyRwXkyCubUe6gdvAjHvtMRLN8KLBI11eCDqk36ScyDj1kdfCI002FULOKh8"
);

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const CheckoutForm = ({
  price,
  applicationId,
  setShowCheckoutModal,
  getUserApplications,
  userId,
}) => {
  const notify = () => toast.success("Payment successful!");
  const [paid, setPaid] = useState(false);
  const notifyError = () => toast.error("Payment failed!");
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Step 1: Get client secret for Stripe payment
    const clientSecret = await paymentProcessing(applicationId, price);
    if (!clientSecret) {
      console.log("Failed to initiate payment.");
      notifyError();
      setLoading(false);
      return;
    }

    // Step 2: Confirm the payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: applicationId },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("Payment successful!");

      // Step 3: Mark application as paid
      await markApplicationAsPaid(applicationId);
      notify();
      //close the modal
      setShowCheckoutModal(false);
      getUserApplications(userId);
      setPaid(true);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <Toaster />
      <p className="text-sm text-gray-700">Card Information</p>
      <CardElement options={cardStyle} />

      <button
        type="submit"
        disabled={!stripe || loading || paid}
        className={`btn mt-4 ${
          loading
            ? "bg-green-800 text-white"
            : { paid }
            ? "bg-green-500"
            : "bg-blue-500"
        }`}
      >
        {loading ? "Processing..." : paid ? "Paid" : `Pay $${price}.00`}
      </button>
    </form>
  );
};

const PaymentPage = ({
  price,
  applicationId,
  setShowCheckoutModal,
  getUserApplications,
  userId,
}) => (
  useEffect(() => {
    console.log("Price: ", price);
    console.log("Application ID: ", applicationId);
  }, [price, applicationId]),
  (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        price={price}
        applicationId={applicationId}
        setShowCheckoutModal={setShowCheckoutModal}
        getUserApplications={getUserApplications}
        userId={userId}
      />
    </Elements>
  )
);

export default PaymentPage;
