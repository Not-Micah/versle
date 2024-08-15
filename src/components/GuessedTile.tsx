import React, { useState, useEffect } from "react";
import { percentageToColors } from "@/data";

const GuessedTile = ({
  index,
  guess,
  percentageDifference,
  icon,
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
      editPercentage((prevPercentage) => {
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
    <div className="grid grid-cols-3 bg-light-gray generic-tile gap-2 overflow-hidden">
      <p className="dynamic-text-lg overflow-x-clip mr-2 text-nowrap overflow-ellipsis">{guess}</p>
      <div className="flex flex-row justify-start items-center dynamic-square-spacing">
        {squares.map((_, index) => (
          <div
            key={index} 
            className={`dynamic-square rounded-sm fade-in z-0`}
            style={{ backgroundColor: colorList[index] }}
          ></div>
        ))}
      </div>
      <div className="flex flex-row justify-end gap-3">
        <p className="text-right dynamic-text-md">{percentage}%</p>
        <p className="dynamic-text-md">{icon}</p>
      </div>
    </div>
  );
};

export default GuessedTile;
