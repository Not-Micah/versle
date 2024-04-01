"use client";

import Modal from "./Modal";
import useGameStatus from "@/hooks/useResults";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ResultsModal = () => {
    const { isOpen, onOpen, onClose } = useGameStatus();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

  return (
    <Modal title="How to play" description="" isOpen={isOpen} onChange={onChange}>
        <div className="flex flex-row justify-between items-center w-full">
          <h3>
            Test
            {/* {gameCondition === "lost"
              ? "Uh oh! You ran out of tries."
              : gameCondition === "won" && "Good job!"} */}
          </h3>
        </div>
        <p>
          Hi
          {/* {gameCondition === "lost"
            ? `The correct answer was ____! This comes from ____. Try again tomorrow 😊`
            : gameCondition === "won" &&
              `Today's verse comes from ${location}. Play again tomorrow 😊`} */}
        </p>
    </Modal>
  )
}

export default ResultsModal