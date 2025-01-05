import axios from "axios";

const API_KEY = '4d08107bf793a075e91aee4ebcb4161f'; 

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY,
                lang: 'ru',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Ошибка при запросе погоды:', error);
        throw new Error('Ошибка при получении данных');
    }
};
