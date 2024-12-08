"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface VerseContextType {
    verse: string;
    book: string;
    location: string;
}

const VerseContext = createContext<VerseContextType | undefined>(undefined);

interface VerseProviderProps {
  children: React.ReactNode;
}

const getDailyVerse = async () => {
  try {
    //http://localhost:3000/api/verses
    //https://versle.vercel.app/api/verses
    const res = await fetch("https://versle.vercel.app/api/verses", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch!");
    }

    //http://localhost:3000/api/counter
    //https://versle.vercel.app/api/counter
    await fetch("https://versle.vercel.app/api/counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plays: 1 }),
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const VerseProvider: React.FC<VerseProviderProps> = ({ children }) => {
  const [verse, setVerse] = useState("");
  const [book, setBook] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchVerse = async () => {
      const data = await getDailyVerse();
      if (data) {
        setVerse(data.verse);
        setBook(data.book);
        setLocation(data.location);
      }
    };

    fetchVerse();
  }, []);

  const value = {
    verse,
    book,
    location,
  };

  return (
    <VerseContext.Provider value={value}>
      {children}
    </VerseContext.Provider>
  );
};

const useVerseContext = () => {
  const context = useContext(VerseContext);
  if (context === undefined) {
    throw new Error("useGuessContext must be used within a GuessProvider");
  }
  return context; 
};

export { VerseProvider, useVerseContext };
