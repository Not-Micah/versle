"use client";

import React from "react";
import EntryTile from "@/components/EntryTile";
import EmptyTile from "@/components/EmptyTile";
import CountTile from "./CountTile";
import GuessedTile from "./GuessedTile";
import { guessType } from "@/data";
import { useState, useEffect } from "react";
import ResultsOverlay from "./ResultsOverlay";

const GuessSection = ({ book, location }: { book: string, location: string }) => {
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
    if (guessData.some((item : guessType) => item.guess === book)) {
      return "won";
    } else if (guessNumber === 4) {
      return "lost";
    }

    return "playing";
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
    <section className="relative">
      <div className="flex flex-col gap-1 mx-6">
        <CountTile guessNumber={guessNumber} />
        {guessData.map((item: guessType, index: number) =>
          item.guess !== "" ? (
            <GuessedTile
              index={index}
              guess={item.guess}
              percentageDifference={item.percentage}
              icon={item.icon}
              key={index}
            />
          ) : (
            <EmptyTile key={index} />
          )
        )}
        <EntryTile
          status={status}
          editStatus={editStatus}
          guessData={guessData}
          editGuessData={editGuessData}
          currentGuess={currentGuess}
          editCurrentGuess={editCurrentGuess}
          guessNumber={guessNumber}
          editGuessNumber={editGuessNumber}
          correctBook={book}
        />
      </div>
      {(status === "won" || status === "lost") && <ResultsOverlay status={status} book={book} location={location} /> }
    </section>
  );
};

export default GuessSection;
