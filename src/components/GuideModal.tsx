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
    }

    const colorsExample = ["#123123", "#321321", "#123123", "#321321", "#123123"];

  return (
    <Modal title="How to play" description="" isOpen={isOpen} onChange={onChange}>
        <div className="flex flex-col justify-center items-start gap-5">
          <p>Guess which book the displayed verse comes from!</p>
          <div className="flex flex-row bg-light-gray justify-around items-center generic-tile gap-5 w-full">
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
    </Modal>
  )
}

export default GuideModal