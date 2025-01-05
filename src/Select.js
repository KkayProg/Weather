import React, { useState, useEffect } from "react";
import Select from "react-select";

const fetchCities = async (query) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&language=ru`);
  const data = await response.json();
  
  return data.map(city => ({
    value: city.address.city,  
    label: city.address.city, 
  }));
};

export const MainSelect = ({ selectedCity, setSelectedCity }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue) {
      const getCities = async () => {
        const cities = await fetchCities(inputValue);
        setOptions(cities);
      };

      getCities();
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgb(112 174 230 / 77%)",
      width: "194px",
      height: "38px",
      border: "none",
      borderRadius: "10px",
      zIndex: "100",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#FFFFFF",
    }),
    menu: (styles) => ({
      ...styles,
      width: "194px",
      zIndex: "101",
    }),
  };

  return (
    <Select
      value={options.find((option) => option.value === selectedCity)} 
      onChange={(selectedOption) => setSelectedCity(selectedOption.value)} 
      options={options}
      styles={colourStyles}
      placeholder="Выберите город"
      onInputChange={setInputValue}
    />
  );
};