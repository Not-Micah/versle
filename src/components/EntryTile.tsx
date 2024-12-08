"use client";

import React from "react";
import AutoComplete from "./AutoComplete";
import { bibleBooks } from "@/data";
import { useGuessContext } from "@/providers/DataProvider";
import { useStreakContext } from "@/providers/StreakProvider";
import useGameStatus from "@/hooks/useResults";

const EntryTile = ({ correctBook }: { correctBook: string }) => {
  const {
    status,
    setStatus,
    guessData,
    setGuessData,
    currentGuess,
    setCurrentGuess,
    guessNumber,
    setGuessNumber,
  } = useGuessContext();

  const { onOpen } = useGameStatus();
  const { wins, losses, setWins, setLosses } = useStreakContext();

  const submitEntry = () => {
    if (
      bibleBooks.includes(currentGuess) &&
      guessNumber !== 4 &&
      !guessData.some((item) => item.guess === currentGuess) &&
      status === "playing"
    ) {
      //////////
      const updatedList = guessData.slice();
      const guessIndex = bibleBooks.indexOf(currentGuess);
      const correctIndex = bibleBooks.indexOf(correctBook);

      //////////
      updatedList[guessNumber].guess = currentGuess;

      //////////
      const updatedPercentageDifference =
      100 -
      Math.round((Math.abs(correctIndex - guessIndex) / bibleBooks.length) * 100);    
      updatedList[guessNumber].percentage = updatedPercentageDifference;

      console.log("Guess Index ", guessIndex, "Correct Index", correctIndex)

      //////////
      if (guessIndex < correctIndex) {
        updatedList[guessNumber].icon = "➡️"; 
      } else if (guessIndex > correctIndex) {
        updatedList[guessNumber].icon = "⬅️"; 
      } else {
        updatedList[guessNumber].icon = "🏆"; 
      }      

      // //////////
      if (
        guessNumber === 3 &&
        !guessData.some((item) => item.guess === correctBook)
      ) {
        setTimeout(() => {
          setStatus("lost");
          setLosses(losses+1);
          onOpen();
        }, 5000);
      } else if (guessData.some((item) => item.guess === correctBook)) {
        setTimeout(() => {
          setStatus("won");
          setWins(wins+1);
          onOpen();
        }, 5000);
      }

      //////////
      setGuessData(updatedList);
      setGuessNumber(guessNumber + 1);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center gap-1 w-full">
      <div className="flex-1">
        <AutoComplete
          options={bibleBooks}
          editCurrentGuess={setCurrentGuess}
        />
      </div>
      <button
        className="w-1/3 generic-tile uppercase font-bold cursor-pointer duration-300 bg-dark-gray text-white dynamic-text-md overflow-ellipsis"
        onClick={submitEntry}
      >
        Guess
      </button>
    </div>
  );
};

export default EntryTile;
