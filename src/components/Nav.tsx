"use client";

import React, { useState } from "react";
import { FaQuestion, FaGear } from "react-icons/fa6";
import GuideOverlay from "./F GuideOverlay";
import useGuide from "@/hooks/useGuide";

const Nav = () => {
  // const [showGuide, setShowGuide] = useState(false);
  const { onClose, onOpen, isOpen } = useGuide();

  return (
    <div className="relative">
      <nav className="flex flex-row items-center justify-between mx-6">
          <div className="circle-icon">
            <FaQuestion onClick={() => {
              onOpen()
            }} />
          </div>
        <div className="text-black uppercase dynamic-text-xl font-bold">Versle</div>
        <div className="circle-icon">
          <FaGear />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
