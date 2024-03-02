'use client';

import React from "react";
import Nav from "@/components/Nav";
import Verse from "@/components/Verse";
import GuessSection from "@/components/GuessSection";
import ResultsOverlay from "@/components/ResultsOverlay";
import { useState, useEffect } from "react";

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

const Home = () => {
  var correctBook = "";
  var correctVerse = "";
  var verse = "";

  getDailyVerse().then(dailyData => {
    correctBook = dailyData.book;
    correctVerse = dailyData.location;
    verse = dailyData.verse;
    console.log(correctBook, correctVerse, verse)
  });

  const emptyData = [
    { guess: "", percentage: 0, icon: "" },
    { guess: "", percentage: 0, icon: "" },
    { guess: "", percentage: 0, icon: "" },
    { guess: "", percentage: 0, icon: "" },
  ];
  
  const [guessData, editGuessData] = useState(() => {
    const data = window.localStorage.getItem("VERSLE_GUESSES");
    return data !== null ? JSON.parse(data) : emptyData;
  });

    ///////////////
    const [guessNumber, editGuessNumber] = useState(() => {
      const index = window.localStorage.getItem("VERLSE_GUESS_NUMBER");
      return index !== null ? parseInt(index) : 0;
    });
    const [currentGuess, editCurrentGuess] = useState("");
  
    const [status, editStatus] = useState(() => {
      if (guessData.some(item => item.guess === correctBook)) {
        return "won"
      } else if (guessNumber === 4) {
        return "lost"
      }
      
      return "playing"
    });

    useEffect(() => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
      const lastPlayed = window.localStorage.getItem("VERSLE_LAST_DATE");
  
      if (!lastPlayed || JSON.parse(lastPlayed) !== formattedDate) {
        editGuessNumber(0);
        editGuessData(emptyData);
        window.localStorage.setItem("VERSLE_GUESSES", JSON.stringify(""));
        window.localStorage.setItem("VERLSE_GUESS_NUMBER", JSON.stringify(0));
        window.localStorage.setItem(
          "VERSLE_LAST_DATE",
          JSON.stringify(formattedDate)
          );
        }
    });
  
    useEffect(() => {
      window.localStorage.setItem("VERSLE_GUESSES", JSON.stringify(guessData));
    }, [guessData]);
  
    useEffect(() => {
      window.localStorage.setItem(
        "VERLSE_GUESS_NUMBER",
        JSON.stringify(guessNumber)
      );
    }, [guessNumber]);
  

  return (
    <div className="max-w-[600px] mx-auto my-8">
      <Nav />
      <Verse verse="For God so love the world he sent his one and only son so whoever believed in him would not perish but have eternal life." />
      <GuessSection
        status={status}
        editStatus={editStatus}
        guessData={guessData}
        editGuessData={editGuessData}
        currentGuess={currentGuess}
        editCurrentGuess={editCurrentGuess}
        guessNumber={guessNumber}
        editGuessNumber={editGuessNumber}
        correctBook={correctBook}
        />
        {/* Add a white translucent overlay behind the modal... */}
        {(status === "won" || status === "lost") && <ResultsOverlay status={status} correctBook={correctBook} correctVerse={correctVerse} /> }
    </div>
  )
}

export default Home