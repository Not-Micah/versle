"use client";

import { useVerseContext } from "@/providers/VerseProvider";

const Verse = () => {
  
  const { verse } = useVerseContext();

  console.log(verse);

  return (
    <section className="flex justify-center items-center mx-6 my-16 text-center">
        <p className="dynamic-text-lg">{verse}</p>
    </section>
  )
}

export default Verse