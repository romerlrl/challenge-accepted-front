import { City } from "./city";

export interface WeatherData {
  period: {
    begin: string;
    end: string;
  };
  locale: City;
  weather: WeatherEntry[];
}

export interface WeatherEntry {
  date: string;
  text: string;
  temperature: {
    min: number;
    max: number;
  };
  rain: {
    probability: number;
    precipitation: number;
  };
}

