import { City } from './city'

interface WeatherData {
    period: {
        begin: string;
        end: string;
    };
    locale: City;
    weather: WeatherEntry[];
}

interface WeatherEntry {
    date: string;
    text: string;
    temperature: {
        min: number;
        max: number;
    };
    rain: {
        probability: number;
        precipitation: number | string;
    };
}