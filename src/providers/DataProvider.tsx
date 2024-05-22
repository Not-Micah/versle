"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import useGameStatus from "@/hooks/useResults";

interface GuessData {
  guess: string;
  percentage: number;
  icon: string;
}

interface GuessContextType {
  guessData: GuessData[];
  guessNumber: number;
  currentGuess: string;
  status: string;
  setGuessData: Function;
  setGuessNumber: Function;
  setCurrentGuess: Function;
  setStatus: Function;
}

const GuessContext = createContext<GuessContextType | undefined>(undefined);

interface GuessProviderContext {
  children: React.ReactNode;
}

const GuessProvider: React.FC<GuessProviderContext> = ({ children }) => {
  const { isOpen, onOpen } = useGameStatus();

  const emptyData: GuessData[] = [
    { guess: "", percentage: 0, icon: "" },
    { guess: "", percentage: 0, icon: "" },
    { guess: "", percentage: 0, icon: "" },
    { guess: "", percentage: 0, icon: "" },
  ];

  const [guessData, setGuessData] = useState<GuessData[]>(emptyData);
  const [guessNumber, setGuessNumber] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");

  const [status, setStatus] = useState<string>("playing");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    const lastPlayed = window.localStorage.getItem("VERSLE_LAST_DATE");

    if (!lastPlayed || JSON.parse(lastPlayed) !== formattedDate) {
      console.log("This is the reason of your problems");

      setGuessNumber(0);
      setGuessData(emptyData);
      window.localStorage.setItem("VERSLE_GUESSES", JSON.stringify(""));
      window.localStorage.setItem("VERLSE_GUESS_NUMBER", JSON.stringify(0));
      window.localStorage.setItem(
        "VERSLE_LAST_DATE",
        JSON.stringify(formattedDate)
      );
    } else {
      const tempGuesses = window.localStorage.getItem("VERSLE_GUESSES");
      const tempGuessNumber = window.localStorage.getItem("VERLSE_GUESS_NUMBER");

      if (tempGuesses && tempGuessNumber) {
        const memGuess = JSON.parse(tempGuesses);

        // ERROR FIX P1
        if (memGuess) {
          setGuessData(memGuess);
          setGuessNumber(
            JSON.parse(tempGuessNumber)
          );
        }
      }
      

      if (guessData.some((item) => item.icon === "🏆")) {
        onOpen();
        setStatus("won");
      } else if (guessNumber === 4) {
        onOpen();
        setStatus("lost");
      } else {
        setStatus("playing");
      }
    }
  }, []);

  useEffect(() => {
    // ERROR FIX P2 Not directly comparing guessData with emptyData due to type issues 'guessData[0].guess !== ""' 
    if (guessData && guessData[0].guess !== "") {
      window.localStorage.setItem("VERSLE_GUESSES", JSON.stringify(guessData));
      window.localStorage.setItem(
        "VERLSE_GUESS_NUMBER",
        JSON.stringify(guessNumber)
      );
      console.log("Passing through update effect.");
    }
  }, [guessData, guessNumber]);

  const value = {
    guessData,
    guessNumber,
    currentGuess,
    status,
    setGuessData,
    setGuessNumber,
    setCurrentGuess,
    setStatus,
  };

  return (
    <GuessContext.Provider value={value}>{children}</GuessContext.Provider>
  );
};

const useGuessContext = () => {
  const context = useContext(GuessContext);
  if (context === undefined) {
    throw new Error("useGuessContext must be used within a GuessProvider");
  }
  return context;
};

export { GuessProvider, useGuessContext };
