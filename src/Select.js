import React, { useState, useEffect } from "react";
import Select from "react-select";
import citiesData from "./data/world-cities.json"; // Подключаем JSON с городами

export const MainSelect = ({ selectedCity, setSelectedCity }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Состояние для ввода

  // Функция для определения языка ввода
  const detectLanguage = (text) => {
    const cyrillicPattern = /[а-яА-ЯёЁ]/;
    return cyrillicPattern.test(text) ? "ru" : "en";
  };

  // Когда пользователь вводит запрос, фильтруем города
  useEffect(() => {
    if (inputValue) {
      const timeoutId = setTimeout(() => {
        const inputLang = detectLanguage(inputValue); // Определяем язык ввода
        const filteredCities = citiesData
          .filter((city) => {
            if (inputLang === "ru") {
              return (
                city.name_ru &&
                city.name_ru.toLowerCase().includes(inputValue.toLowerCase())
              );
            } else {
              return city.name
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }
          })
          .map((city) => ({
            value: city.name_ru || city.name,
            label:
              inputLang === "ru"
                ? `${city.name_ru || city.name}, ${city.country}`
                : `${city.name || city.name_ru}, ${city.country}`,
          }));
        setOptions(filteredCities);
      }, 300);
      return () => clearTimeout(timeoutId);
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
      value={options.find((option) => option.value === selectedCity)} // Отображаем текущее значение
      onChange={(selectedOption) => setSelectedCity(selectedOption?.value || "")} // Обновляем город
      options={options}
      styles={colourStyles}
      placeholder="Выберите город"
      onInputChange={(newValue) => setInputValue(newValue)} // Обновляем состояние при вводе
    />
  );
};
