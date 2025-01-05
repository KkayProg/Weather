import axios from "axios";

export const API_KEY = '4d08107bf793a075e91aee4ebcb4161f';

// Базовый URL OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city, // Город
                units: 'metric', // Температура в градусах Цельсия
                appid: API_KEY, // API-ключ
                lang: 'ru', // Язык ответа
            }
        });

        return response.data;
    } catch (error) {
        console.error('Ошибка при запросе погоды:', error);
        return null; // Если произошла ошибка, вернём null
    }
};