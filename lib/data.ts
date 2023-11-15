import { CurrentWeatherDataResponse, MinMaxTemperature } from "./types";

export const NullMinMaxTemperature: MinMaxTemperature = {
    min: null,
    max: null,
    weatherIcon: null,
    dayOfWeek: null
}

export const NullCurrentWeatherDataResponse: CurrentWeatherDataResponse = {
    coord: {
        lon: null,
        lat: null
    },
    weather: [{
        id: null,
        main: null,
        description: null,
        icon: null
    }],
    base: null,
    main: {
        feels_like: null,
        temp: null,
        pressure: null,
        humidity: null,
        temp_min: null,
        temp_max: null
    },
    visibility: null,
    wind: {
        speed: null,
        deg: null,
        gust: null
    },
    clouds: {
        all: null
    },
    dt: null,
    sys: {
        type: null,
        id: null,
        message: null,
        country: null,
        sunrise: null,
        sunset: null
    },
    id: null,
    name: null,
    cod: null
}