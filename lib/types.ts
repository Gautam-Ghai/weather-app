export interface ForecastData {
    [date: string]: {
        temperatures: number[];
        weatherIcons: string[];
        dayOfWeek: string;
    };
}

export interface WeatherEntry {
    dt: number;
    main: {
        temp: number;
    };
    weather: {
        icon: string;
    }[];
}

export interface MinMaxTemperature {
    min: number | null;
    max: number | null;
    weatherIcon: string | null;
    dayOfWeek: string | null;
}

interface Coord {
    lon: number | null;
    lat: number | null;
}

interface Weather {
    id: number | null;
    main: string | null;
    description: string | null;
    icon: string | null;
}

interface Main {
    feels_like: number | null;
    temp: number | null;
    pressure: number | null;
    humidity: number | null;
    temp_min: number | null;
    temp_max: number | null;
}

interface Wind {
    speed: number | null;
    deg: number | null;
    gust: number | null;
}

interface Clouds {
    all: number | null;
}

interface Sys {
    type: number | null;
    id: number | null;
    message: number | null;
    country: string | null;
    sunrise: number | null;
    sunset: number | null;
}

export interface CurrentWeatherDataResponse {
    coord: Coord;
    weather: Weather[];
    base: string | null;
    main: Main;
    visibility: number | null;
    wind: Wind;
    clouds: Clouds;
    dt: number | null;
    sys: Sys;
    id: number | null;
    name: string | null;
    cod: number | null;
}