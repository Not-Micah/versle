"use client";

import Modal from "./Modal";
import useGameStatus from "@/hooks/useResults";
import { useGuessContext } from "@/providers/DataProvider";
import { percentageToColors, guessType } from "@/data";
import { useVerseContext } from "@/providers/VerseProvider";
import { useStreakContext } from "@/providers/StreakProvider";
import { useState } from "react";

const ResultsModal = () => {
  const { isOpen, onClose } = useGameStatus();
  const { status, guessData } = useGuessContext();
  const { location } = useVerseContext();
  const { wins, losses } = useStreakContext();

  // Either "daily" or "stats"
  const [activeState, setActiveState] = useState("daily");

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const colorsToEmojis = (colors: string[]) => {
    const emojiList = [];
    for (let i = 0; i < colors.length; i++) {
      if (colors[i] === "#7DC884") {
        emojiList.push("🟢");
      } else if (colors[i] === "#B59F3B") {
        emojiList.push("🟡");
      } else {
        emojiList.push("⚪");
      }
    }
    return emojiList;
  };

  const percentageToString = (guessData: guessType[]) => {
    var outputDisplay = "";
    for (let i = 0; i < guessData.length; i++) {
      const colorList = percentageToColors(guessData[i].percentage);
      const emojiList = colorsToEmojis(colorList);

      for (let j = 0; j < emojiList.length; j++) {
        outputDisplay += emojiList[j];
      }

      outputDisplay += "\n";
    }

    return outputDisplay;
  };

  const dateObj = new Date();
  const date =
    dateObj.getUTCFullYear() +
    "/" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getUTCDate();
  const emojiBoard =
    "Versle " + String(date) + "\n" + percentageToString(guessData);

  return (
    <Modal
      title="Results"
      description=""
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="w-full flex flex-row justify-center items-center gap-x-4 mb-6">
        <button onClick={() => {
          setActiveState("daily");
        }}
        className={`${activeState === "daily" && "text-black/70 border-b-2 border-black/70"}
        outline-none text-sm uppercase font-semibold text-black/30`}>
          Results
        </button>
        <button onClick={() => {
          setActiveState("stats");
        }}
        className={`${activeState === "stats" && "text-black/70 border-b-2 border-black/70"}
        outline-none text-sm uppercase font-semibold text-black/30`}>
          Stats
        </button>
      </div>

      {activeState == "daily" ? (
        <div className="flex flex-col justify-start items-center w-full gap-y-4">
          <p className="text-center">
            {status === "lost" ? "Uh oh!" : "Good job!"} Today&apos;s verse comes
            from <br /> {location}. Play again tomorrow!
          </p>
          <div className="flex flex-col gap-y-3">
            {guessData.map((item, index) => {
              const emojiList = colorsToEmojis(
                percentageToColors(item.percentage)
              );
              return (
                <div
                  key={index}
                  className="flex flex-row justify-center items-center gap-x-4"
                >
                  {emojiList.map((emoji, idx) => (
                    <p key={idx}>{emoji}</p>
                  ))}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(emojiBoard);
            }}
            className="text-sm px-4 py-2 font-bold uppercase bg-gray-300 rounded-full mt-6
                         outline-none shadow-sm"
          >
            Click to copy!
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center gap-y-2 w-full">
          <div className="flex flex-row justify-start items-center w-full">
            <p className="uppercase font-bold text-black/70 text-nowrap mr-6 w-[110px]">Wins {wins}</p>
            <div className="h-[8px] bg-green-300 rounded-md shadow-sm w-full"></div>
          </div>
          <div className="flex flex-row justify-start items-center w-full">
            <p className="uppercase font-bold text-black/70 text-nowrap mr-6 w-[110px]">Losses {losses}</p>
            <div className="h-[8px] bg-gray-300 rounded-md shadow-sm w-full"></div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ResultsModal;
