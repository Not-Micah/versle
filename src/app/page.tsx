"use client";

import RoundedButton from "@/components/RoundedButton";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const getCurrentDate = (): string => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const date = getCurrentDate();

  return (
    <div className="bg-gray-600/10">
      <div className="w-full h-[100vh] flex justify-center items-center overflow-hidden max-[350px]:hidden">
        <div className="flex flex-col justify-center items-center gap-y-10 min-w-[300px] px-5">
          <div className="flex flex-col gap-y-2">
            <h3 className="uppercase text-center font-bold dynamic-text-xl tracking-wide">
              Versle!
            </h3>
            <p className="dynamic-text-lg text-center">
              Get 4 chances to guess which book the <br /> verse comes from.
            </p>
          </div>
          <div className="flex flex-row gap-x-2 w-full
          max-[500px]:flex-col max-[500px]:gap-y-2">
            <RoundedButton
              className="bg-transparent border-black/80 text-black/80"
              onClick={() => router.replace("./play")}
            >
              Play
            </RoundedButton>
            <RoundedButton>
              <a href="https://micah-builds.vercel.app/">About The Dev</a>
            </RoundedButton>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-gray-500 dynamic-text-sm">{date}</p>
            <p className="text-gray-500 dynamic-text-sm">Built by Micah Tid</p>
          </div>
        </div>
      </div>
      <div className="min-[350px]:hidden px-3 bg-white">
        Device too small to display.
      </div>
    </div>
  );
};

export default Home;
