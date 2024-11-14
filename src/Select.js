import Select from "react-select";

export const MainSelect = ({ selectedCity, setSelectedCity }) => {
    const options = [
        { value: "Anapa", label: "Анапа" },
        { value: "Arkhangelsk", label: "Архангельск" },
        { value: "Astrakhan", label: "Астрахань" },
        { value: "Barnaul", label: "Барнаул" },
        { value: "Bangkok", label: "Бангкок" },
        { value: "Beijing", label: "Пекин" },
        { value: "Berlin", label: "Берлин" },
        { value: "Buenos Aires", label: "Буэнос-Айрес" },
        { value: "Cape Town", label: "Кейптаун" },
        { value: "Cheboksary", label: "Чебоксары" },
        { value: "Chelyabinsk", label: "Челябинск" },
        { value: "Chicago", label: "Чикаго" },
        { value: "Cairo", label: "Каир" },
        { value: "Dubai", label: "Дубай" },
        { value: "Dzerzhinsk", label: "Дзержинск" },
        { value: "Gorky", label: "Горький" },
        { value: "Hong Kong", label: "Гонконг" },
        { value: "Irkutsk", label: "Иркутск" },
        { value: "Istanbul", label: "Стамбул" },
        { value: "Jakarta", label: "Джакарта" },
        { value: "Johannesburg", label: "Йоханнесбург" },
        { value: "Kazan", label: "Казань" },
        { value: "Kaliningrad", label: "Калининград" },
        { value: "Kaluga", label: "Калуга" },
        { value: "Kemerovo", label: "Кемерово" },
        { value: "Kiev", label: "Киев" },
        { value: "Kirov", label: "Киров" },
        { value: "Kolomna", label: "Коломна" },
        { value: "Krasnoyarsk", label: "Красноярск" },
        { value: "Krasnodar", label: "Краснодар" },
        { value: "Kursk", label: "Курск" },
        { value: "Kurgan", label: "Курган" },
        { value: "Lipetsk", label: "Липецк" },
        { value: "London", label: "Лондон" },
        { value: "Los Angeles", label: "Лос-Анджелес" },
        { value: "Makhachkala", label: "Махачкала" },
        { value: "Mexico City", label: "Мехико" },
        { value: "Moscow", label: "Москва" },
        { value: "Murmansk", label: "Мурманск" },
        { value: "Mumbai", label: "Мумбаи" },
        { value: "Naberezhnye Chelny", label: "Набережные Челны" },
        { value: "Nizhnekamsk", label: "Нижнекамск" },
        { value: "Nizhny Novgorod", label: "Нижний Новгород" },
        { value: "Nizhny Tagil", label: "Нижний Тагил" },
        { value: "Novokuznetsk", label: "Новокузнецк" },
        { value: "Novosibirsk", label: "Новосибирск" },
        { value: "Omsk", label: "Омск" },
        { value: "Orenburg", label: "Оренбург" },
        { value: "Paris", label: "Париж" },
        { value: "Perm", label: "Пермь" },
        { value: "Petrozavodsk", label: "Петрозаводск" },
        { value: "Rio de Janeiro", label: "Рио-де-Жанейро" },
        { value: "Rostov-on-Don", label: "Ростов-на-Дону" },
        { value: "Rome", label: "Рим" },
        { value: "Ryazan", label: "Рязань" },
        { value: "San Francisco", label: "Сан-Франциско" },
        { value: "São Paulo", label: "Сан-Паулу" },
        { value: "Samara", label: "Самара" },
        { value: "Saransk", label: "Саранск" },
        { value: "Seoul", label: "Сеул" },
        { value: "Shanghai", label: "Шанхай" },
        { value: "Siberia", label: "Сибирь" },
        { value: "Sao Paulo", label: "Сан-Паулу" },
        { value: "Surgut", label: "Сургут" },
        { value: "Sydney", label: "Сидней" },
        { value: "Stavropol", label: "Ставрополь" },
        { value: "Tikhvin", label: "Тихвин" },
        { value: "Tokyo", label: "Токио" },
        { value: "Tula", label: "Тула" },
        { value: "Tyumen", label: "Тюмень" },
        { value: "Ufa", label: "Уфа" },
        { value: "Ulyanovsk", label: "Ульяновск" },
        { value: "Vladivostok", label: "Владивосток" },
        { value: "Vladikavkaz", label: "Владикавказ" },
        { value: "Volgograd", label: "Волгоград" },
        { value: "Vologda", label: "Вологда" },
        { value: "Voronezh", label: "Воронеж" },
        { value: "Yekaterinburg", label: "Екатеринбург" },
        { value: "Yakutsk", label: "Якутск" },
        { value: "Yaroslavl", label: "Ярославль" },
        { value: "Zurich", label: "Цюрих" }
      ];
      

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
      onChange={(selectedOption) => setSelectedCity(selectedOption.value)} // Обновляем город
      options={options}
      styles={colourStyles}
      placeholder="Выберите город"
    />
  );
};
