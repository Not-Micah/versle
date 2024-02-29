import React from 'react'

const Verse = ({ verse } : { verse : string }) => {
  return (
    <section className="flex justify-center items-center px-20 my-16">
        <p className="text-xl">{verse}</p>
    </section>
  )
}

export default Verse