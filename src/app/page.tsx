"use client";

import RoundedButton from "@/components/RoundedButton";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="">
      <div className="max-[350px]:hidden relative w-[100vw] h-[100vh] overflow-hidden">
        <div className="w-full h-[100vh] flex justify-center items-center absolute">
          <div className="flex flex-col justify-center items-center gap-y-8 min-w-[300px]">
            <h3 className="uppercase text-center font-semibold text-5xl tracking-wide">
              Versle!
            </h3>
            <RoundedButton onClick={() => router.replace("./play")}>
              Play
            </RoundedButton>
            <RoundedButton>
              <a href="https://micahtid.vercel.app/">About The Dev</a>
            </RoundedButton>
          </div>
        </div>
        <div
          className="w-[800px] h-[800px] bg-gray-500 rounded-full absolute
      -top-[550px] left-1/2 transform -translate-x-1/2 
      opacity-10
      "
        ></div>
        <div
          className="w-[800px] h-[800px] bg-gray-500 rounded-full absolute
      top-[800px] left-1/2 transform -translate-x-1/2 
      opacity-10
      "
        ></div>
      </div>
      <div className="min-[350px]:hidden px-3">
        Device too small to display.
      </div>
    </div>
  );
};

export default Home;
