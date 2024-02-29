import React from 'react'

const CountTile = ({ guessNumber } : { guessNumber : number }) => {
  return (
    <div className="generic-tile font-bold uppercase flex justify-center items-center bg-dark-gray text-white">
        Guesses {guessNumber}/4
    </div>
  )
}

export default CountTile