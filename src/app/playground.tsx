"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  setGuessData: React.Dispatch<React.SetStateAction<GuessData[]>>;
  setGuessNumber: React.Dispatch<React.SetStateAction<number>>;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
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

const getDailyVerse = async () => {
  try {
    const res = await fetch("https://versle.vercel.app/api/verses", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch!");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const GuessProvider: React.FC<GuessProviderContext> = async ({ children }) => {
  const [{ verse, book, location }] = await getDailyVerse();

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
    if (guessData.some((item) => item.guess === book)) {
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
      setGuessNumber(0);
      setGuessData(emptyData);
      window.localStorage.setItem("VERSLE_GUESSES", JSON.stringify(""));
      window.localStorage.setItem("VERLSE_GUESS_NUMBER", JSON.stringify(0));
      window.localStorage.setItem(
        "VERSLE_LAST_DATE",
        JSON.stringify(formattedDate)
      );
    }
  }, [setGuessData, setGuessNumber]);

  useEffect(() => {
    window.localStorage.setItem("VERSLE_GUESSES", JSON.stringify(guessData));
  }, [guessData]);

  useEffect(() => {
    window.localStorage.setItem(
      "VERLSE_GUESS_NUMBER",
      JSON.stringify(guessNumber)
    );
  }, [guessNumber]);

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
