"use client";

import Modal from "./Modal";
import useGameStatus from "@/hooks/useResults";
import { useGuessContext } from "@/providers/DataProvider";
import { percentageToColors } from "@/data";
import { guessType } from "@/data";
import { stringify } from "querystring";

const ResultsModal = () => {
    const { isOpen, onClose } = useGameStatus();
    const { status, guessData } = useGuessContext();

    const onChange = (open : boolean) => {
        if (!open) {
            onClose();
        }
    }

    const colorsToEmojis = (colors : string[]) => {
      const emojiList = [];
      for (let i = 0; i < colors.length; i++) {
        if (colors[i] === "#7DC884") {
          emojiList.push("🟢");
        } else if (colors[i] === "#B59F3B") {
          emojiList.push("🟡");
        } else  {
          emojiList.push("⚪");
        }
      }
      return emojiList;
    }

    const percentageToString = (guessData : guessType[]) => {
      var outputDisplay = "";
      for (let i=0; i<guessData.length; i++){
        const colorList = percentageToColors(guessData[i].percentage);
        const emojiList = colorsToEmojis(colorList);

        for (let j=0; j<emojiList.length; j++){
          outputDisplay += emojiList[j]
        }

        outputDisplay += "\n"
      }

      return outputDisplay
    };

    const dateObj = new Date();
    const date = (dateObj.getUTCFullYear()) + "/" + (dateObj.getMonth() + 1)+ "/" + (dateObj.getUTCDate());
    const emojiBoard =  "Versle " + String(date) + "\n" + percentageToString(guessData)
  
    return (
        <Modal title={status === "lost" ? "Aw man!" : "Good Job!"} description="" isOpen={isOpen} onChange={onChange}>
            <div className="flex flex-col justify-start items-center w-full gap-y-4">
              <p className="text-center">
                Share your Versle results! <br />
                Play again tomorrow!
              </p>
              <div className="flex flex-col gap-y-3">
                {
                  guessData.map((item, index) => {
                    const emojiList = colorsToEmojis(percentageToColors(item.percentage));
                    return (
                      <div key={index} className="flex flex-row justify-center items-center gap-x-4">
                        {emojiList.map((emoji, idx) => (
                          <p key={idx}>
                            {emoji}
                          </p>
                        ))}
                      </div>
                    )
                  })
                }
              </div>
              <button
              onClick={() => {navigator.clipboard.writeText(emojiBoard)}}
              className="text-lg px-4 py-2 font-semibold uppercase bg-gray-300 rounded-full mt-6
               outline-none shadow-sm"
              >Click to share!</button>
            </div>  
        </Modal>
    )
}

export default ResultsModal;
