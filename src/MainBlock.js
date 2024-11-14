import React, { useState, useEffect } from "react";
import { MainSelect } from "./Select";
import { ThisDay } from "./ThisDay";
import { AboutInfo } from "./AboutInfo";
import { fetchWeather } from "./fetchWeather";

function MainBlock() {
  const [selectedCity, setSelectedCity] = useState("Omsk"); // Город по умолчанию
  const [weatherData, setWeatherData] = useState(null); // Данные о погоде
  const [error, setError] = useState(""); // Ошибка


  
  // Получение данных о погоде
  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeather(selectedCity);
      if (data) {
        setWeatherData(data);
        setError("");
      } else {
        setError("Не удалось получить данные о погоде.");
      }
    };

    getWeather();
  }, [selectedCity]);

  return (
    <div className="main__block">
      <header className="main__header">
        <h1 className="main__title">The weather</h1>
        <MainSelect selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      </header>
      <div className="main__weather">
        <ThisDay selectedCity={selectedCity} weatherData={weatherData} error={error} />
        <AboutInfo weatherData={weatherData} />
      </div>
    </div>
  );
}

export default MainBlock;
