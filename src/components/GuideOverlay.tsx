import React from "react";
import { IoClose } from "react-icons/io5";

const GuideOverlay = ({
  showGuide,
  setShowGuide,
}: {
  showGuide: boolean;
  setShowGuide: Function;
}) => {
  const colorsExample = ["#123123", "#321321", "#123123", "#321321", "#123123"];

  return (
    <div className={`v-[100vh] w-[100vw] ${!showGuide && "hidden"} z-10`}>
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
          <h3>How to Play</h3>
          <button onClick={() => setShowGuide(false)}>
            <div className="circle-icon">
              <IoClose />
            </div>
          </button>
        </div>
        <div className="flex flex-col justify-center items-start gap-5">
          <p>Guess which book the displayed verse comes from!</p>
          <div className="flex flex-row bg-light-gray justify-around items-center generic-tile gap-5">
            <div className="flex flex-row gap-8">
              <p className="flex">John</p>
              <div className="flex-5 flex flex-row justify-start items-center gap-5">
                {colorsExample.map((color, index) => (
                  <div
                    key={index}
                    className={`w-[18px] h-[18px] rounded-sm fade-in z-0`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex-3 flex flex-row gap-3">
              <p className="">➡️</p>
              <p className="text-right">5%</p>
            </div>
          </div>
          <p>
            How close your guess was is displayed as a percentage, and also the
            colored squares, with a right or left icon indicating the direction
            of the correct book. You have 4 attempts to guess the right book!
            Good luck!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideOverlay;
