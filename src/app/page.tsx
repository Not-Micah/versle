"use client";

import RoundedButton from "@/components/RoundedButton";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="">
        <div className="w-full h-[100vh] flex justify-center items-center overflow-hidden max-[350px]:hidden">
          <div className="flex flex-col justify-center items-center gap-y-6 min-w-[300px] px-5">
            <h3 className="uppercase text-center font-semibold text-4xl tracking-wide">
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
      <div className="min-[350px]:hidden px-3">
        Device too small to display.
      </div>
    </div>
  );
};

export default Home;
