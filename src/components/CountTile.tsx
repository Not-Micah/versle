"use client";

import React from 'react'
import { useGuessContext } from '@/providers/DataProvider'

const CountTile = () => {
  const { guessNumber } = useGuessContext();

  return (
    <div className="generic-tile font-bold uppercase flex justify-center items-center bg-dark-gray text-white dynamic-text-md">
        Guesses {guessNumber}/4
    </div>
  )
}

export default CountTile