class weatherController {
    async getCityList(req, res) {
        // Міста для відображення в меню
        const cities = ['Kyiv', 'New York', 'London', 'Paris', 'Tokyo', 'Miami', 'Vinnitsya', 'Canberra'];
        // Передача міст у шаблон weather.hbs
        res.render('city-list', {cities})
    }

    async getWeatherByCity(req, res) {
        const city = req.params.city;
        try {
            // Отримуємо координати міста
            const geoUrl =
                `${process.env.GEOCODING_API_URL}?q=${city}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`;
            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();
            const {lat, lon} = geoData[0];

            // Округлення lat та lon до 4 знаків після коми
            const roundedLat = parseFloat(lat).toFixed(4);
            const roundedLon = parseFloat(lon).toFixed(4);

            // Отримуємо погоду за координатами
            const weatherUrl =
                `${process.env.WEATHER_API_URL}?lat=${roundedLat}&lon=${roundedLon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();
            const mainData = weatherData.weather[0];

            console.log(weatherData);

            // Відображаємо дані у шаблоні
            res.render('weather-card', {city, weatherData, mainData});
        } catch (error) {
            console.error('Помилка:', error);
            res.status(500).send('Помилка під час отримання погодних даних');
        }
    }
}

export default new weatherController;