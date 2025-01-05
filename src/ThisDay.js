import { useState, useEffect } from "react";
import { GlobalSvgSelector } from "./icons/global/GlobalSvgSelector";
import { fetchWeather } from "./fetchWeather";

export const ThisDay = ({ selectedCity }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(""); // Время в выбранном городе
  const [error, setError] = useState("");

  // Получение погоды и времени
  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeather(selectedCity);
      if (data) {
        setWeatherData(data);
        setError("");

        // Расчёт времени в выбранном городе
        const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000; // Текущее UTC время
        const cityTime = new Date(utcTime + data.timezone * 1000); // Время с учётом смещения
        setCurrentTime(cityTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      } else {
        setError("Не удалось получить данные о погоде.");
      }
    };

    getWeather();
  }, [selectedCity]);

  // Обновление времени каждую минуту
  useEffect(() => {
    const interval = setInterval(() => {
      if (weatherData) {
        const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const cityTime = new Date(utcTime + weatherData.timezone * 1000);
        setCurrentTime(cityTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    }, 60000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, [weatherData]);
  function WeatherIcon({ icon }) {
    if (!icon) return null;
    if (icon === "01d") {
      return <GlobalSvgSelector id="sun" />;
    } 
    if (icon === "01n") {
      return <GlobalSvgSelector id="moon" />;
    }
    if (icon === "01n") {
      return <GlobalSvgSelector id="moon" />;
    }
    if (icon === "02d" || icon === '03d') {
      return <GlobalSvgSelector id="slight_cloud_cover" />;
    }
    if (icon === "02n" || icon === '03n') {
      return <GlobalSvgSelector id="slight_cloud_cover_night" />;
    }
    if (icon === "04d") {
      return <GlobalSvgSelector id="mostly_cloudy" />;
    }
    if (icon === "04n") {
      return <GlobalSvgSelector id="mostly_cloudy_night" />;
    }
    if (icon === "10n" || icon === "10d" || icon === "09n" || icon === "09d") {
      return <GlobalSvgSelector id="rain" />;
    }
    if (icon === "11n" || icon === "11d") {
      return <GlobalSvgSelector id="thunderstorm" />;
    }
    if (icon === "13n" || icon === "13d") {
      return <GlobalSvgSelector id="snow" />;
    }
    if (icon === "50n" || icon === "50d") {
      return <GlobalSvgSelector id="haze" />;
    }
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return <img src={iconUrl} alt="Weather Icon" />;
  }

  
  // Использование компонента

  return (
    <div className="this__day">
      <div className="top__block">
        <div className="top__block_wrapper">
          <div className="temp">
            {weatherData ? `${Math.round(weatherData.main.temp)}°` : "Загрузка..."}
          </div>
          <div className="this-date">Сегодня</div>
        </div>
        <WeatherIcon icon={weatherData?.weather?.[0]?.icon || ""} />
      </div>
      <div className="botoom__block">
        <div className="time">
          Время: <span>{currentTime || "Загрузка..."}</span>
        </div>
        <div className="city">
          Город: <span>{selectedCity}</span>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
