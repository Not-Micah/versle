"use client";

import useHomeStatus from "@/hooks/useHome";

interface HomeProviderProps {
  children: React.ReactNode;
}

const HomeProvider = ({ children } : { children: React.ReactNode }) => {
  const { isHomeOpen, onHomeClose } = useHomeStatus();

  if (isHomeOpen) {
    return (
    <div className="w-full flex flex-col justify-center items-center h-[100vh] bg-accent">
        <h3 className=" font-bold text-3xl">Versle</h3>
        <button className="bg-red-500" onClick={() => onHomeClose()}>Play</button>
        <a href="">About The Dev</a>
      </div>
    );
  } else {
    return <div>{children}</div>;
  }
};

export default HomeProvider;
