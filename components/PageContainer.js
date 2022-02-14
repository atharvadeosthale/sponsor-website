import React from "react";
import Step from "./Step";

function PageContainer({ step, children }) {
  return (
    <div className="max-w-4xl h-screen bg-white flex flex-col p-14 overflow-y-scroll">
      <img src="/me.jpeg" className="h-14 w-14 object-cover rounded-full" />

      {/* Steps */}
      <div className="mt-10 flex">
        <Step name="Welcome" number={1} enabled={step == 1} />
        <Step name="Details" number={2} enabled={step == 2} />
        <Step name="Thank you" number={3} enabled={step == 3} />
      </div>

      <div className="mt-14">{children}</div>
    </div>
  );
}

export default PageContainer;
