"use client";

import Modal from "./Modal";
import useGuide from "../hooks/useGuide";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const GuideModal = () => {
  const { onClose, isOpen } = useGuide();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const colorsExample = ["#7DC884", "#7DC884", "#7DC884", "#B59F3B", "#3A3A3C"];

  return (
    <Modal
      title="How to play"
      description=""
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col justify-center items-center gap-5 max-[350px]:hidden">
        <p className="text-center">Guess which book the displayed verse comes from!</p>
        {/*  */}
        <div className="grid grid-cols-5 bg-light-gray generic-tile gap-2 overflow-hidden">
          <p className="dynamic-text-lg col-span-1 overflow-x-clip mr-2">John</p>
          <div className="flex flex-row col-span-3 justify-start items-center dynamic-square-spacing">
            {colorsExample.map((color, index) => (
              <div
                key={index} 
                className={`dynamic-square rounded-sm fade-in z-0`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
          <div className="flex flex-row justify-end gap-3 col-span-1 ">
            <p className="text-right dynamic-text-md">85%</p>
            <p className="dynamic-text-md">➡️</p>
          </div>
        </div>
        {/*  */}

        <p className="text-center">
          How close your guess was is displayed as a percentage, and also the
          colored squares, with a right or left icon indicating the direction of
          the correct book. You have 4 attempts to guess the right book! Good
          luck!
        </p>
      </div>
    </Modal>
  );
};

export default GuideModal;
