import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { setCookies } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ClipLoader, HashLoader } from "react-spinners";
import PageContainer from "../components/PageContainer";

function Details() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const pay = async () => {
    try {
      if (!firstName || !lastName || !email || amount < 1)
        return alert("All fields are required!");
      if (!stripe || !elements) return;
      setLoading(true);
      const name = firstName + " " + lastName;
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, amount }),
      });
      const data = await res.json();
      const cardElement = elements.getElement(CardElement);
      const confirmPayment = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );
      if (confirmPayment.error) {
        alert("Payment failed!");
        return setLoading(false);
      }
      if (confirmPayment.paymentIntent.status == "succeeded") {
        // do something
        setCookies("paymentId", confirmPayment.paymentIntent.id);
        return router.replace("/thanks");
      }
      alert("Payment not confirmed");
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Payment was not successful.");
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundSize: "cover",
      }}
    >
      <Head>
        <title>Sponsor - Atharva Deosthale</title>
      </Head>

      <PageContainer step={2}>
        <div className="text-4xl font-bold">Enter details</div>
        <div className="mt-10 flex flex-col w-full">
          <div className="grid grid-cols-2 gap-5 w-full">
            <input
              type="text"
              className="border-[1px] border-gray-400 px-3 py-2 text-lg rounded-md"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="border-[1px] border-gray-400 px-3 py-2 text-lg rounded-md"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            className="mt-5 border-[1px] border-gray-400 px-3 py-2 text-lg rounded-md"
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="mt-5 h-36 border-[1px] border-gray-400 px-3 py-2 text-lg rounded-md"
            placeholder="Message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            className="mt-5 border-[1px] border-gray-400 px-3 py-2 text-lg rounded-md"
            placeholder="Amount (INR)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <CardElement className="border-[1px] border-gray-400 rounded-md p-3 mt-5" />
          <hr className="mt-14" />
          <div className="mt-10 flex w-full flex-row-reverse">
            <button
              onClick={pay}
              disabled={loading}
              className={`${
                loading ? "bg-blue-600" : "bg-blue-500"
              } px-10 w-56 h-12 py-2 text-lg text-white rounded-md hover:bg-blue-600 transition-all`}
            >
              {loading ? (
                <HashLoader color="white" size={25} />
              ) : (
                "Proceed to pay"
              )}
            </button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default Details;
