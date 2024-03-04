"use client";

import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const ResultsOverlay = ({
  status,
  book,
  location,
}: {
  status: string;
  book: string;
  location: string;
}) => {
  const [visibility, editVisibility] = useState(true);

  return (
    <div className={`v-[100vh] w-[100vw] ${!visibility && "hidden"}`}>
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      bg-black w-[100%] h-[100%] opacity-50"
      ></div>
      <div
        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed
     bg-gray-100 flex flex-col gap-5 justify-center items-start rounded-md shadow-md
     px-6 pt-4 pb-8 max-w-[30rem]"
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h3>
            {status === "lost"
              ? "Uh oh! You ran out of tries."
              : status === "won" && "Good job!"}
          </h3>
          <button onClick={() => editVisibility(false)}>
            <div className="circle-icon">
              <IoClose />
            </div>
          </button>
        </div>
        <p>
          {status === "lost"
            ? `The correct answer was ${book}! This comes from ${location}. Try again tomorrow 😊`
            : status === "won" &&
              `Today's verse comes from ${location}. Play again tomorrow 😊`}
        </p>
      </div>
    </div>
  );
};

export default ResultsOverlay;
