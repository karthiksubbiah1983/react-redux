import React, { useState } from "react";
import "./autoComplete.css";

interface AutocompleteDropdownProps {
  countryHandler: (country: string) => void;
  countryList: string[];
  defaultValue?: string;
}

const AutocompleteDropdown = (props: AutocompleteDropdownProps) => {
  const [inputValue, setInputValue] = useState(props.defaultValue);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  console.log(props.countryList);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    props.countryHandler("");

    if (event.target.value) {
      const filtered: string[] = props.countryList.filter((country: string) =>
        country.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  const handleCountryClick = (country: string) => {
    props.countryHandler(country);
    setInputValue(country);
    setFilteredCountries([]);
  };

  return (
    <div className="c-autoComplete">
      <input
        type="text"
        id="country"
        name="country"
        value={inputValue}
        onChange={handleInputChange}
        required
      />
      {filteredCountries.length > 0 && (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={index} onClick={() => handleCountryClick(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteDropdown;
