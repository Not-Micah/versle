import React from 'react'

const Verse = ({ verse } : { verse : string }) => {
  const verseParts = Array.from({ length: 5 }, (_, index) => {
    const startIndex = Math.floor((verse.length / 5) * index);
    const endIndex = Math.floor((verse.length / 5) * (index + 1));
    return verse.slice(startIndex, endIndex);
  });

  return (
    <section className="flex justify-center items-center mx-6 my-16 text-center">
        <p className="dynamic-text-lg">{verse}</p>
    </section>
  )
}

export default Verse