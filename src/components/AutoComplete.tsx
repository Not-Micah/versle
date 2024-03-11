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
        <ul className="absolute z-10 bg-gray-100 top-[36px] mt-2 suggestion-tile rounded-md w-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
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
