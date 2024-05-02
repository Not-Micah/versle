"use client";

import { GridLoader } from "react-spinners"

const Loading = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <GridLoader size={30} color="#5C5E60"/>
    </div>
  )
}

export default Loading