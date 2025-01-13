import React, { useState, useEffect } from "react";
import { MainSelect } from "./Select";
import { ThisDay } from "./ThisDay";
import { AboutInfo } from "./AboutInfo";
import { fetchWeather } from "./fetchWeather";
import citiesData from "./data/world-cities.json"; // Подключаем JSON с городами

function MainBlock() {
  const [selectedCity, setSelectedCity] = useState(""); // Город по умолчанию
  const [weatherData, setWeatherData] = useState(null); // Данные о погоде
  const [error, setError] = useState(""); // Ошибка
  const [locationErrorShown, setLocationErrorShown] = useState(false); // Флаг для ошибки

  // Получение местоположения пользователя
  useEffect(() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              console.table(data.address);
              setSelectedCity(data.address.city);
            })
            .catch(() => {
              console.log("Ошибка получения данных от API");
            });
        },
        () => {
          if (!locationErrorShown) {
            alert("Ошибка получения местоположения, используйте поиск");
            setLocationErrorShown(true); // Установить флаг ошибки
          }
        }
      );
    }

    getLocation();
  }, [locationErrorShown]); // Зависимость только от флага ошибки

  // Получение данных о погоде
  useEffect(() => {
    const getWeather = async () => {
      if (selectedCity) {
        const data = await fetchWeather(selectedCity);
        if (data) {
          setWeatherData(data);
          setError("");
        } else {
          setError("Не удалось получить данные о погоде.");
        }
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
