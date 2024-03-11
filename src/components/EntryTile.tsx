import React from "react";
import AutoComplete from "./AutoComplete";
import { bibleBooks, guessType } from "@/data";

const EntryTile = ({
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
  const submitEntry = () => {
    if (
      bibleBooks.includes(currentGuess) &&
      guessNumber !== 4 &&
      !guessData.some(item => item.guess === currentGuess) &&
      status === "playing"
    ) {
      //////////
      const updatedList = guessData.slice();
      const guessIndex = bibleBooks.indexOf(currentGuess);
      const correctIndex = bibleBooks.indexOf(correctBook);

      //////////
      updatedList[guessNumber].guess = currentGuess;
      
      //////////
      const updatedPercentageDifference = 100 - Math.round(
        (Math.abs(
          correctIndex - guessIndex
          ) /
          correctIndex) *
          100
          );
      updatedList[guessNumber].percentage = updatedPercentageDifference

      //////////
      if ((correctIndex - guessIndex) > 0) {
        updatedList[guessNumber].icon = "➡️";
      } else if ((correctIndex - guessIndex) < 0) {
        updatedList[guessNumber].icon = "⬅️";
      } else {
        updatedList[guessNumber].icon = "🏆";
      }
      
      // //////////
      if (guessNumber===3 && !guessData.some(item => item.guess === correctBook)) {
        setTimeout(() => {
          editStatus("lost");
        }, 5000)
      } else if (guessData.some(item => item.guess === correctBook)) {
        setTimeout(() => {
          editStatus("won");
        }, 5000)
      }

      //////////
      editGuessData(updatedList);
      editGuessNumber(guessNumber + 1);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center gap-1 w-full">
      <div className="flex-1">
        <AutoComplete
          options={bibleBooks}
          editCurrentGuess={editCurrentGuess}
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
