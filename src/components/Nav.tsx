"use client";

import React, { useState } from "react";
import { FaQuestion, FaGear } from "react-icons/fa6";
import GuideOverlay from "./GuideOverlay";

const Nav = () => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="relative">
      <nav className="flex flex-row items-center justify-between mx-6">
          <div className="circle-icon">
            <FaQuestion onClick={() => setShowGuide(true)} />
          </div>
        <div className="text-black uppercase dynamic-text-xl font-bold">Versle</div>
        <div className="circle-icon">
          <FaGear />
        </div>
      </nav>
      {showGuide === true && (
        <div className="absolute z-50">
          <GuideOverlay showGuide={showGuide} setShowGuide={setShowGuide}/>
        </div>
      )}
    </div>
  );
};

export default Nav;
