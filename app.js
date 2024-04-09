import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import hbs from 'hbs'
import { fileURLToPath } from 'url';
import weatherController from "./weather.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express()


app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'views'));
dotenv.config()

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')))


// Стандартний шлях '/', який перенаправляє користувача на '/weather'
app.get('/', (req, res) => {
     res.redirect('/weather');
});

// Шлях для /weather
app.get('/weather', weatherController.getCityList);

// Шлях для /weather/{city}
app.get('/weather/:city', weatherController.getWeatherByCity);


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})