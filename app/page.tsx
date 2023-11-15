"use client"
import { useEffect, useState } from "react";
import { ForecastData, CurrentWeatherDataResponse, MinMaxTemperature, WeatherEntry } from "@/lib/types"
import Days from "@/components/days";
import { NullCurrentWeatherDataResponse, NullMinMaxTemperature } from "@/lib/data";
import Main from "@/components/main";

const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?";

export default function Home() {

  const [city, setCity] = useState("");

  const [weather, setWeather] = useState<CurrentWeatherDataResponse>(NullCurrentWeatherDataResponse);

  const [forecast, setForecast] = useState<MinMaxTemperature[]>(Array(5).fill(NullMinMaxTemperature));

  const [error, setError] = useState("");
  const [units, setUnits] = useState("metric");

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function convertTo5DayForecast(apiResponse: { list: WeatherEntry[] }): ForecastData {
    const forecastData: ForecastData = {};

    apiResponse.list.forEach(entry => {
      const timestamp = entry.dt * 1000; // Convert Unix timestamp to milliseconds
      const currentDate = new Date();
      const entryDate = new Date(timestamp);

      // Skip data for the current day
      if (entryDate.getDate() === currentDate.getDate()) {
        return;
      }

      const date = entryDate.toLocaleDateString();
      const dayOfWeek = entryDate.toLocaleDateString('en-US', { weekday: 'long' });
      const icon = entry.weather[0].icon;

      if (!forecastData[date]) {
        forecastData[date] = {
          temperatures: [],
          weatherIcons: [],
          dayOfWeek: dayOfWeek
        };
      }

      const temperature = entry.main.temp;
      const weatherIcon = icon;

      forecastData[date].temperatures.push(temperature);
      forecastData[date].weatherIcons.push(weatherIcon);
    });

    return forecastData;
  }

  function calculateMinMaxTemperatures(forecastData: ForecastData): MinMaxTemperature[] {
    const minMaxTemperatures = [];

    for (const date in forecastData) {
      const temperatures = forecastData[date].temperatures;
      const minTemp = Math.min(...temperatures);
      const maxTemp = Math.max(...temperatures);
      const weatherIcons = forecastData[date].weatherIcons;
      const dayOfWeek = forecastData[date].dayOfWeek;

      minMaxTemperatures.push(
        {
          min: minTemp,
          max: maxTemp,
          weatherIcon: weatherIcons[2],
          dayOfWeek: dayOfWeek
        });
    }

    return minMaxTemperatures;
  }

  async function success(pos: { coords: any; }) {
    var crd = pos.coords;
    const weatherUrl = `${BASE_WEATHER_URL}lat=${crd.latitude}&lon=${crd.longitude}&units=${units}&appid=${process.env.WEATHER_API_KEY}`;
    const forecastUrl = `${FORECAST_URL}lat=${crd.latitude}&lon=${crd.longitude}&units=${units}&appid=${process.env.WEATHER_API_KEY}`

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    if (weatherResponse && weatherData && weatherResponse.status === 200) {
      setWeather(weatherData);
      console.log(weatherData)

    } else {
      setError("Server Problem");
    }

    if (forecastResponse && forecastData && forecastResponse.status === 200) {
      const result = calculateMinMaxTemperatures(convertTo5DayForecast(forecastData));
      // console.log(result);
      setForecast(result);

    } else {
      setError("Server Problem");
    }

  }

  function errors() {
    setError("Permission Denied");
  }


  function load() {
    setWeather(NullCurrentWeatherDataResponse);
    setError("");

    try {
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                success,
                errors,
                options
              );
            } else if (result.state === "denied") {
              setError("Permission Denied");
            }
          });
      } else {
        setError("Location not Available");
      }
    } catch (err) {
      setError("Permission Denied");
    }
  }

  useEffect(() => {
    load();
  }, [units])


  return (
    <main className="container flex min-h-screen grid-cols-12 grid-rows-6 flex-col gap-6 py-8 md:grid">
      <div className="col-span-12 row-span-2 w-full md:col-span-6 lg:col-span-4 xl:row-span-6">
        <Main weather={weather} />
      </div>
      <div className="col-span-12 row-span-2 md:col-span-6 lg:col-span-8">
        <h3 className="my-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          This week
        </h3>
        <div className="flex items-start justify-normal gap-4 overflow-x-auto md:flex-wrap md:items-center md:justify-center md:overflow-hidden">
          {
            forecast.map((data, id) => <div key={id}>
              <Days min={data.min} max={data.max} weatherIcon={data.weatherIcon} dayOfWeek={data.dayOfWeek} />
            </div>)
          }
        </div>
      </div>

    </main>
  )
}
