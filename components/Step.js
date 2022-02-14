import React from "react";

function Step({ name, number, enabled }) {
  return (
    <div className="flex items-center mr-10">
      <div
        className={`h-12 w-12 flex items-center justify-center text-lg ${
          enabled
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 hover:bg-gray-500"
        } text-white rounded-xl cursor-pointer transition-all`}
      >
        {number}
      </div>
      <div
        className={`hidden md:block text-lg ml-5 ${
          enabled ? "text-blue-500" : "text-gray-500"
        }`}
      >
        {name}
      </div>
    </div>
  );
}

export default Step;
