"use client";

import React, { useState } from "react";
import { FaQuestion, FaChartArea, FaGear, FaBookmark } from "react-icons/fa6";
import GuideOverlay from "./GuideOverlay";

const Nav = () => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="relative">
      <nav className="flex flex-row items-center justify-between mx-6">
        <div className="flex flex-row justify-center items-center gap-1">
          <div className="circle-icon">
            <FaBookmark />
          </div>
          <div className="circle-icon">
            <FaQuestion onClick={() => setShowGuide(true)} />
          </div>
        </div>
        <div className="text-black uppercase text-2xl font-bold">Versle</div>
        <div className="flex flex-row justify-center items-center gap-1">
          <div className="circle-icon">
            <FaChartArea />
          </div>
          <div className="circle-icon">
            <FaGear />
          </div>
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
