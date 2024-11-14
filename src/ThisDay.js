import { useState, useEffect } from "react";
import { GlobalSvgSelector } from "./icons/global/GlobalSvgSelector";
import { fetchWeather } from "./fetchWeather";

export const ThisDay = ({ selectedCity }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [time, setTime] = useState(new Date()); // Состояние для времени

  // Получение погоды при изменении выбранного города
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

  // Обновление времени каждую секунду
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date()); // Обновляем текущее время
    }, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="this__day">
      <div className="top__block">
        <div className="top__block_wrapper">
          {/* Температура */}
          <div className="temp">
            {weatherData ? `${Math.round(weatherData.main.temp)}°` : "Загрузка..."}
          </div>
          {/* Текущая дата */}
          <div className="this-date">Сегодня</div>
        </div>
        {/* Иконка */}
        <GlobalSvgSelector id="sun" />
      </div>

      <div className="botoom__block">
        {/* Время */}
        <div className="time">
          Время: <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Город */}
        <div className="city">
          Город: <span>{selectedCity}</span>
        </div>
      </div>

      {/* Ошибка, если есть */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
