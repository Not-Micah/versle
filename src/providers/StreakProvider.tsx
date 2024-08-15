"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface StreakProviderProps {
  children: React.ReactNode;
}

interface StreakContextType {
  wins: number;
  losses: number;
  setWins: Function;
  setLosses: Function;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

const StreakProvider: React.FC<StreakProviderProps> = ({ children }) => {
  // const getInitialWins = () => {
  //   const storedWins = window.localStorage.getItem("VERSLE_WINS");
  //   return storedWins ? JSON.parse(storedWins) : 0;
  // };

  // const getInitialLosses = () => {
  //   const storedLosses = window.localStorage.getItem("VERSLE_LOSSES");
  //   return storedLosses ? JSON.parse(storedLosses) : 0;
  // };

  // const [wins, setWins] = useState<number>(getInitialWins);
  // const [losses, setLosses] = useState<number>(getInitialLosses);

  // useEffect(() => {
  //   window.localStorage.setItem("VERSLE_WINS", JSON.stringify(wins));
  // }, [wins]);

  // useEffect(() => {
  //   window.localStorage.setItem("VERSLE_LOSSES", JSON.stringify(losses));
  // }, [losses]);

  const [wins, setWins] = useState(-1);
  const [losses, setLosses] = useState(-1);

  useEffect(() => {
    const savedWins = window.localStorage.getItem("VERSLE_WINS");

    if (!savedWins) {
      setWins(0);
      setLosses(0);

      window.localStorage.setItem("VERSLE_WINS", JSON.stringify(0));
      window.localStorage.setItem("VERSLE_LOSSES", JSON.stringify(0));
    } else {
      const savedLosses = window.localStorage.getItem("VERSLE_LOSSES");

      if (savedLosses && savedWins) {
        setWins(JSON.parse(savedWins));
        setLosses(JSON.parse(savedLosses));
      }
    }
  }, []);

  useEffect(() => {
    if (wins !== -1 && losses !== -1) {
      window.localStorage.setItem("VERSLE_LOSSES", JSON.stringify(losses));
      window.localStorage.setItem("VERSLE_WINS", JSON.stringify(wins));
    }
  }, [wins, losses])

  const value = {
    wins,
    losses,
    setWins,
    setLosses,
  };

  return (
    <StreakContext.Provider value={value}>{children}</StreakContext.Provider>
  );
};

const useStreakContext = () => {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error("useStreakContext must be used within a StreakProvider");
  }
  return context;
};

export { StreakProvider, useStreakContext };
