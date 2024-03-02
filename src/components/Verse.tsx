import React from 'react'

const Verse = ({ verse } : { verse : string }) => {
  const verseParts = Array.from({ length: 5 }, (_, index) => {
    const startIndex = Math.floor((verse.length / 5) * index);
    const endIndex = Math.floor((verse.length / 5) * (index + 1));
    return verse.slice(startIndex, endIndex);
  });

  return (
    <section className="flex justify-center items-center px-20 my-16">
        <p className="text-xl">{verse}</p>
    </section>
  )
}

export default Verse