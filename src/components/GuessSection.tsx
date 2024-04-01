"use client";

import React from "react";
import EntryTile from "@/components/EntryTile";
import EmptyTile from "@/components/EmptyTile";
import CountTile from "./CountTile";
import GuessedTile from "./GuessedTile";
import { guessType } from "@/data";
import { useState, useEffect } from "react";

import { useGuessContext } from "@/providers/DataProvider";

const GuessSection = ({ book, location }: { book: string, location: string }) => {
  const { guessData, status } = useGuessContext();

  return (
    <section className="relative">
      <div className="flex flex-col gap-1 mx-6">
        <CountTile />
        {guessData.map((item: guessType, index: number) =>
          item.guess !== "" ? (
            <GuessedTile
              index={index}
              guess={item.guess}
              percentageDifference={item.percentage}
              icon={item.icon}
              key={index}
            />
          ) : (
            <EmptyTile key={index} />
          )
        )}
        <EntryTile
          correctBook={book}
        />
      </div>
    </section>
  );
};

export default GuessSection;
