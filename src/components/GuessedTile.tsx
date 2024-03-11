import React, { useState, useEffect } from "react";
import { percentageToColors } from "@/data";

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

  // Returns list of hex codes
  const colorList = percentageToColors(percentageDifference);

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
    <div className="flex flex-row bg-light-gray justify-between items-center generic-tile gap-2 overflow-hidden">
      <div className="flex flex-row gap-4">
        <p className="flex-3 dynamic-text-md">{guess}</p>
        <div className="flex-5 flex flex-row justify-start items-center dynamic-square-spacing">
          {squares.map((_, index) => (
            <div
              key={index}
              className={`dynamic-square rounded-sm fade-in z-0`}
              style={{ backgroundColor: colorList[index] }} // Modify style
            ></div>
          ))}
        </div>
      </div>
      <div className="flex-3 flex flex-row gap-3">
        <p className="dynamic-text-md">{icon}</p>
        <p className="text-right dynamic-text-md">{percentage}%</p>
      </div>
    </div>
  );
};

export default GuessedTile;
