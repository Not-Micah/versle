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

const emptyData: GuessData[] = [
  { guess: "", percentage: 0, icon: "" },
  { guess: "", percentage: 0, icon: "" },
  { guess: "", percentage: 0, icon: "" },
  { guess: "", percentage: 0, icon: "" },
];

interface GuessProviderContext {
  children: React.ReactNode;
}

const GuessProvider: React.FC<GuessProviderContext> = ({ children }) => {
  const { isOpen, onOpen } = useGameStatus()

  const [guessData, setGuessData] = useState<GuessData[]>(() => {
    const data = window.localStorage.getItem("VERSLE_GUESSES");
    return data !== null ? JSON.parse(data) : emptyData;
  });

  const [guessNumber, setGuessNumber] = useState<number>(() => {
    const index = window.localStorage.getItem("VERLSE_GUESS_NUMBER");
    return index !== null ? parseInt(index) : 0;
  });

  const [currentGuess, setCurrentGuess] = useState<string>("");
  
  const [status, setStatus] = useState<string>(() => {
    if (guessData.some((item) => item.icon === "🏆")) {
      onOpen()
      return "won";
    } else if (guessNumber === 4) {
      onOpen()
      return "lost";
    } else {
      return "playing";
    }
  });

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    const lastPlayed = window.localStorage.getItem("VERSLE_LAST_DATE");

    if (!lastPlayed || JSON.parse(lastPlayed) !== formattedDate) {
      console.log("Ran through here");
      setGuessNumber(0);
      setGuessData(emptyData);
      window.localStorage.setItem("VERSLE_GUESSES", JSON.stringify(""));
      window.localStorage.setItem("VERLSE_GUESS_NUMBER", JSON.stringify(0));
      window.localStorage.setItem(
        "VERSLE_LAST_DATE",
        JSON.stringify(formattedDate)
      );
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("VERSLE_GUESSES", JSON.stringify(guessData));
    window.localStorage.setItem(
      "VERLSE_GUESS_NUMBER",
      JSON.stringify(guessNumber)
    );
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