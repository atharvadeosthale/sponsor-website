import { getCookie, removeCookies } from "cookies-next";
import Head from "next/head";
import React from "react";
import PageContainer from "../components/PageContainer";

function Thanks() {
  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundSize: "cover",
      }}
    >
      <Head>
        <title>Thank you - Atharva Deosthale</title>
      </Head>
      <PageContainer step={3}>
        <div className="text-4xl font-bold">Thank you</div>
        <div className="mt-10 text-xl text-gray-500 leading-9">
          Payment has been successful, Atharva! Thanks for supporting me. This
          will help me provide more value to developers who want to learn and
          get better at their craft. Payment receipt has been sent to your
          provided email. You can now close this tab.
        </div>
      </PageContainer>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const isCookieSet = getCookie("paymentId", { req, res });
    if (!isCookieSet) return { redirect: { destination: "/" } };
    removeCookies("paymentId", { req, res });
    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}

export default Thanks;
