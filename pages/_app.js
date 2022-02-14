import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import "../styles/globals.css";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Elements stripe={promise}>
        <Component {...pageProps} />
      </Elements>
    </>
  );
}

export default MyApp;
