import React from "react";
import Nav from "@/components/Nav";
import Verse from "@/components/Verse";
import GuessSection from "@/components/GuessSection";

const getDailyVerse = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/verses", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch!");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const Home = async () => {
  console.log(await getDailyVerse())
  const [ { verse, book, location } ] = await getDailyVerse();
  console.log(verse, book, location);

  return (
    <div className="max-w-[600px] mx-auto my-8">
      <div className="max-[300px]:hidden">
        <Nav />
        <Verse verse={verse} />
        <GuessSection book={book} location={location} />
      </div>
      <div className="min-[300px]:hidden px-3">
        Device too small to display.
      </div>
    </div>
  );
};

export default Home;
