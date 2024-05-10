// Filter.tsx
import React, { useState } from "react";

interface FilterProps {
  paymentOptions: string[];
  onFilterChange: (selectedOptions: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ paymentOptions, onFilterChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
  };

  const handleClick = () => {
    onFilterChange(selectedOptions);
  };

  return (
    <div>
      <label>Filter by Payment Options:</label>
      {paymentOptions.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      
      <button onClick={handleClick}>Filter</button>
    </div>
  );
};

export default Filter;
