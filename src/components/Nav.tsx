import React from 'react';
import { FaQuestion, FaChartArea, FaGear } from "react-icons/fa6";

const Nav = () => {
  return (
    <nav className="flex flex-row items-center justify-between">
        <div className="">
            <div className="circle-icon">
                <FaQuestion />
            </div>
        </div>
        <div className="text-black uppercase text-2xl font-bold">
            Versle
        </div>
        <div className="flex flex-row justify-center items-center gap-1">
            <div className="circle-icon">
                <FaChartArea />
            </div>
            <div className="circle-icon">
                <FaGear />
            </div>
        </div>
    </nav>
  )
}

export default Nav
