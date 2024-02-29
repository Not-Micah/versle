'use client'

import React, { useState, useEffect, useRef } from 'react';

const AutoComplete = ({ options, editCurrentGuess } : { options:string[], editCurrentGuess:Function}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null); // Reference to the suggestion list

  useEffect(() => {
    // Event listener to handle clicks outside of the suggestion list
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]); // Close the suggestion list
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    editCurrentGuess(value);                                // Does this work here?

    // Filter options based on input value
    const filteredSuggestions = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (value) => {
    setInputValue(value);
    setSuggestions([]);
    editCurrentGuess(value);                                // Does this work here?
  };

  return (
    <div className="relative" ref={suggestionsRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type to search..."
        className="generic-tile bg-dark-gray text-white outline-none placeholder-white w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-gray-100 top-[36px] w-[600px] mt-2 suggestion-tile rounded-md">
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
