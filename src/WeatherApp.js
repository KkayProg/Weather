import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Импортируем react-select
import { fetchWeather } from './fetchWeather'; // Импортируем функцию для API

const WeatherApp = () => {
  const [city, setCity] = useState('Омск'); // Текущее значение города
  const [weatherData, setWeatherData] = useState(null); // Данные о погоде
  const [error, setError] = useState(''); // Сообщение об ошибке

  // Начальные города для примера
  const initialCities = [
    { value: 'Omsk', label: 'Омск' },
    { value: 'Moscow', label: 'Москва' },
    { value: 'Saint Petersburg', label: 'Санкт-Петербург' },
  ];

  const [options, setOptions] = useState(initialCities); // Список городов в селекте

  // Получение погоды
  const getWeather = async () => {
    const data = await fetchWeather(city);
    if (data) {
      setWeatherData(data);
      setError('');
    } else {
      setError('Не удалось получить данные о погоде.');
    }
  };

  // Автообновление при изменении города
  useEffect(() => {
    getWeather();
  }, [city]);

  // Функция для получения текущего города по геолокации
  const getUserCity = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/reverse?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=ru`
                );
                const data = await response.json();
                const userCity = data[0].name; // Получаем название города
                setCity(userCity); // Устанавливаем город пользователя
            } catch (error) {
                setError('Не удалось определить город.');
            }
        });
    } else {
        setError('Геолокация не поддерживается этим браузером.');
    }
};


  // Вызов функции при монтировании компонента
  useEffect(() => {
    getUserCity();
  }, []);

  // Обработчик добавления нового города
  const handleInputChange = (inputValue) => {
    if (!options.find((option) => option.value === inputValue)) {
      const newOption = { value: inputValue, label: inputValue }; // Создаём новую опцию
      setOptions((prevOptions) => [...prevOptions, newOption]); // Добавляем её в список
    }
    setCity(inputValue); // Устанавливаем новый город
  };

  return (
    <div>
      <h1>The Weather</h1>

      {/* Динамический Select */}
      <Select
        value={{ value: city, label: city }} // Текущее значение
        onChange={(selectedOption) => setCity(selectedOption.value)} // Обновление города при выборе
        onInputChange={(inputValue) => handleInputChange(inputValue)} // Добавление нового города
        options={options} // Опции для выбора
        isSearchable // Включаем поиск
        placeholder="Выберите или введите город" // Текст-заполнитель
      />

      <button onClick={getWeather}>Обновить</button>

      {/* Вывод ошибок */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Вывод данных о погоде */}
      {weatherData ? (
        <div>
          <h2>{weatherData.main.temp}°C</h2>
          <p>Город: {weatherData.name}</p>
          <p>Ощущается как: {weatherData.main.feels_like}°C</p>
          <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
          <p>Описание: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default WeatherApp;
