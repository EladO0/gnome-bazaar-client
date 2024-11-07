import { useEffect, useState } from "react";
import { getWeather } from "../../services/repositories/common-repository";
import { WEATHER_POOLING as WEATHER_PULLING } from "../../config/constants";
import "./Weather.scss";
import { Thermostat } from "@mui/icons-material";

const Weather = () => {
  const [weather, setWeather] = useState<string>("");

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherResult = await getWeather();
      setWeather(weatherResult);
    };
    fetchWeather();
    const interval = setInterval(() => {
      fetchWeather();
    }, WEATHER_PULLING);

    return () => clearInterval(interval);
  }, []);

  const weatherNumber = parseInt(weather);
  const weatherClass = weatherNumber > 25 ? "hot" : "cold";

  return (
    <div className="weather">
      {weather}c
      <Thermostat className={`icon ${weatherClass}`} />
    </div>
  );
};
export default Weather;
