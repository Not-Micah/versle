import React from "react";
import Nav from "@/components/Nav";
import Verse from "@/components/Verse";
import GuessSection from "@/components/GuessSection";

const getDailyVerse = async () => {
  try {
    // https://versle.vercel.app/api/verses
    const res = await fetch("http://localhost:3000/api/verses", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch!");
    }

    return res.json();
  } catch (error) {
    // console.log(error);
  }
};

const Play = async () => {
  try {
    const { verse, book, location } = await getDailyVerse();

    return (
      <div className="max-w-[600px] mx-auto my-8">
        <div className="max-[350px]:hidden">
          <Nav />
          <Verse verse={verse} />
          <GuessSection book={book} location={location} />
        </div>
        <div className="min-[350px]:hidden px-3">
          Device too small to display.
        </div>
      </div>
    );
  } catch (e) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <h3 className="max-w-[200px] textl-xl text-center">
          It seems there was an error...
        </h3>
      </div>
    );
  }
};

export default Play;
