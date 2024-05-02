"use client";

import React, { useState } from "react";
import { FaQuestion, FaGear } from "react-icons/fa6";
import useGuide from "@/hooks/useGuide";

const Nav = () => {
  // const [showGuide, setShowGuide] = useState(false);
  const { onClose, onOpen, isOpen } = useGuide();

  return (
    <div className="relative">
      <nav className="flex flex-row items-center justify-between mx-6">
        <div className="circle-icon">
          <FaQuestion
            onClick={() => {
              onOpen();
            }}
          />
        </div>
        <div className="text-blackuppercase text-3xl font-bold relative">
          <svg
            width="120"
            height="36"
            viewBox="0 0 255 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[20px] -left-[10px]"
          >
            <path
              d="M2.99975 17.6351C116.771 12.3405 178.178 12.7036 252 18.0966"
              stroke="#000000"
              stroke-width="5.75696"
              stroke-linecap="round"
            />
          </svg>
          Versle
        </div>
        <div className="circle-icon">
          <FaGear />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
