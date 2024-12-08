'use client'

import React, { useState, useEffect, useRef } from 'react';

const AutoComplete = ({ options, editCurrentGuess } : { options:string[], editCurrentGuess:Function}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null); // Reference to the suggestion list

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside); // Clean up event listener
  }, []);
  

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    editCurrentGuess(value);                           

    // Filter options based on input value
    const filteredSuggestions = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (value : string) => {
    setInputValue(value);
    setSuggestions([]);
    editCurrentGuess(value);                    
  };

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type to search..."
        className="generic-tile bg-dark-gray text-white outline-none placeholder-white w-full dynamic-text-md"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-[#3D3C35]/80 backdrop-blur-[3.5px] rounded-md w-full max-h-[300px] overflow-y-auto shadow-sm
        flex flex-col gap-1"
        style={{ bottom: '49px'}}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="cursor-pointer text-white rounded-md dynamic-text-md
              px-4 py-2 max-[500px]:py-3"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
