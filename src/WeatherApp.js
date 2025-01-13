// import React, { useState, useEffect } from 'react';
// import Select from 'react-select'; // Импортируем react-select
// import { fetchWeather } from './fetchWeather'; // Импортируем функцию для API
// import citiesData from "./data/world-cities.json"; // Подключаем JSON с городами

// const WeatherApp = () => {
//   const [city, setCity] = useState('Omsk'); // Текущее значение города
//   const [weatherData, setWeatherData] = useState(null); // Данные о погоде
//   const [error, setError] = useState(''); // Сообщение об ошибке

//   // Начальные города для примера
//   const initialCities = [
//     { value: 'Omsk', label: 'Омск' },
//     { value: 'Moscow', label: 'Москва' },
//     { value: 'Saint Petersburg', label: 'Санкт-Петербург' },
//   ];

//   const [options, setOptions] = useState(initialCities); // Список городов в селекте

//   // Получение погоды
//   const getWeather = async () => {
//     const data = await fetchWeather(city);
//     if (data) {
//       setWeatherData(data);
//       setError('');
//     } else {
//       setError('Не удалось получить данные о погоде.');
//     }
//   };

//   // Автообновление при изменении города
//   useEffect(() => {
//     getWeather();
//   }, [city]);

//   // Обработчик добавления нового города
//   const handleInputChange = (inputValue) => {
//     if (!options.find((option) => option.value === inputValue)) {
//       const cityData = citiesData.find(city => city.name === inputValue || city.name_ru === inputValue);
//       const newOption = cityData ? { value: cityData.name || cityData.name_ru, label: `${cityData.name || cityData.name_ru}, ${cityData.country}` } : { value: inputValue, label: inputValue }; // Создаём новую опцию
//       setOptions([...options, newOption]);
//     }
//   };

//   return (
//     <div>
//       <Select
//         options={options}
//         onInputChange={handleInputChange}
//         onChange={(selectedOption) => setCity(selectedOption.value)}
//       />
//       {weatherData && (
//         <div>
//           <h2>Погода в {city}</h2>
//           <p>Температура: {weatherData.temperature}°C</p>
//           <p>Описание: {weatherData.description}</p>
//         </div>
//       )}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default WeatherApp;