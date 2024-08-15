import React from "react";
import Nav from "@/components/Nav";
import Verse from "@/components/Verse";
import GuessSection from "@/components/GuessSection";

const Play = async () => {
  return (
    <div className="max-w-[600px] mx-auto my-8">
      <div className="max-[350px]:hidden">
        <Nav />
        <Verse />
        <GuessSection />
      </div>
      <div className="min-[350px]:hidden px-3">
        Device too small to display.
      </div>
    </div>
  );
};

export default Play;
