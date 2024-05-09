"use client";

import Modal from "./Modal";
import useGameStatus from "@/hooks/useResults";
import { IoClose } from "react-icons/io5";
import { useGuessContext } from "@/providers/DataProvider";
import { useState, useEffect } from "react";

type VerseData = {
  verse: string;
  book: string;
  location: string;
}

const ResultsModal = () => {
    const { isOpen, onClose } = useGameStatus();
    const { status, guessNumber } = useGuessContext();
    const [dailyVerse, setDailyVerse] = useState<VerseData | null>(null);

    useEffect(() => {
      const getDailyVerse = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/verses", {
            cache: "no-store",
          });
      
          if (!res.ok) {
            throw new Error("Failed to fetch!");
          }
          const jsonData = await res.json();
          setDailyVerse(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Optionally, you can set some fallback data or handle the error differently
        }
      };
    
      getDailyVerse();
    
      return () => {
        // Clean up if needed
      };
    }, []);
    

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

  return (
    <Modal title={status === "lost" ? "Aw man!" : "Good Job!"} description="" isOpen={isOpen} onChange={onChange}>
        <div className="flex flex-col justify-start items-center w-full">
          <p className="text-center">
            {status === "lost"
              ? "Uh oh! It looks like you ran out of tries. Try again tomorrow!"
              : status === "won" && "Good job!"}
          </p>
          <p className="text-center">
            {status === "lost"
              ? `The correct answer was ${dailyVerse && dailyVerse.book}! This comes from ${dailyVerse && dailyVerse.verse}. Try again tomorrow 😊`
              : status === "won" &&
              `You solved today's Versle in guess number ${guessNumber}! Play again tomorrow 😊`}
          </p>
        </div>  
    </Modal>
  )
}

export default ResultsModal