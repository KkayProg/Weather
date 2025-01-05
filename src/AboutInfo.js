export const AboutInfo = ({ weatherData }) => {
    if (!weatherData) {
      return <p>Загрузка данных...</p>; // Пока данные не загружены
    }

  
    return (
      <div className="info__main">
        <div className="info__feeling">
          Ощущается как: <p className="info__desr">{Math.round(weatherData.main.feels_like)}°</p>
        </div>
        <div className="info__precipitation">
          Осадки: <p className="info__desr">{weatherData.weather[0].description}</p>
        </div>
        <div className="info__wind">
          Ветер: <p className="info__desr">{weatherData.wind.speed} м/с</p>
        </div>
      </div>
    );
  };
  