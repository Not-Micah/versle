import React from "react";
import EntryTile from "@/components/EntryTile";
import EmptyTile from "@/components/EmptyTile";
import CountTile from "./CountTile";
import GuessedTile from "./GuessedTile";
import { guessType } from "@/data";

const GuessSection = ({
  status,
  editStatus,
  guessData,
  editGuessData,
  currentGuess,
  editCurrentGuess,
  guessNumber,
  editGuessNumber,
  correctBook,
}: {
  status: string;
  editStatus: Function;
  guessData: guessType[];
  editGuessData: Function;
  currentGuess: string;
  editCurrentGuess: Function;
  guessNumber: number;
  editGuessNumber: Function;
  correctBook: string;
}) => {
  return (
    <section className="flex flex-col gap-1 mx-6">
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
        correctBook={correctBook}
      />
    </section>
  );
};

export default GuessSection;
