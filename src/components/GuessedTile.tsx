'use client'
import React, { useState, useEffect } from "react";

const GuessedTile = ({
  index,
  guess,
  percentageDifference,
  icon
}: {
  index: number;
  guess: string;
  percentageDifference: number;
  icon: string;
}) => {
  const [squares, setSquares] = useState<Array<number>>([]);
  const [percentage, editPercentage] = useState(0);

  useEffect(() => {
    const timeoutIds: number[] = [];
    for (let i = 0; i < 5; i++) {
      timeoutIds.push(
        window.setTimeout(() => {
          setSquares((prevSquares) => [...prevSquares, i]);
        }, i * 500)
      );
    }

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      editPercentage(prevPercentage => {
        if (prevPercentage === percentageDifference) {
          clearInterval(interval);
          return percentageDifference;
        } else {
          return prevPercentage + 1;
        }
      });
    }, 25); 
    
    return () => clearInterval(interval);
  }, []); 


  return (
    <div className="flex flex-row bg-light-gray justify-between items-center generic-tile gap-2">
      <div className="flex flex-row gap-8">
        <p className="flex-3 w-[5rem]">{guess}</p>
        <div className="flex-5 flex flex-row justify-start items-center gap-5">
          {squares.map((square, index) => (
            <div
              key={index}
              className="w-[18px] h-[18px] bg-green-500 rounded-sm fade-in" 
            ></div>
          ))}
        </div>
      </div>
      <div className="flex-3 flex flex-row gap-3">
        <p className="w-[2rem]">{icon}</p>
        <p className="w-[3rem] text-right">{percentage}%</p>
      </div>
    </div>
  );
};

export default GuessedTile;
