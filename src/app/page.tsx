"use client";

import useHomeStatus from "@/hooks/useHome";
import RoundedButton from "@/components/RoundedButton";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-y-8 min-w-[300px]">
        <h3 className="uppercase text-center font-semibold text-5xl tracking-widest">Versle!</h3>
        <RoundedButton onClick={() => router.replace("./play")}>
          Play
        </RoundedButton>
        <RoundedButton>
          <a href="https://micahtid.vercel.app/">About The Dev</a>
        </RoundedButton>
      </div>
    </div>
  );
};

export default Home;
