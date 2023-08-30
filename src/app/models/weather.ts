import { City } from "./city";

export interface WeatherData {
  period: {
    begin: string;
    end: string;
  }
  locale: City
  weather: WeatherEntry[]
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

export function getDate(weather: WeatherEntry): string {
  let thisday = new Date(`${weather.date} 12:00:00`)
  let d = thisday.getUTCDate()
  let m = thisday.getMonth() + 1
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}`;
}

export function getIcon(weather: WeatherEntry): string {
  let r: string
  let n = weather.rain.probability
  switch (true) {
    case (n < 30):
      {
        r = "sunny"
        break;
      }

    case (n < 60): {
      r = 'partly_cloudy_day'
      break
    }
    default: {
      r = 'rainy'
      break
    }
  }
  return r
}
export function get_temperature(weather: WeatherEntry, toFahrenheit: boolean, minimal: boolean): string {
  let temp = weather.temperature.max
  let unit = 'º C'
  if (minimal) { temp = weather.temperature.min }
  if (toFahrenheit) {
    temp = (temp * 1.8) + 32
    unit = "º F"
  }
  return `${temp.toFixed(1)} ${unit}`
}

export function get_precipitation(weather: WeatherEntry, to_inch: boolean): string {
  let temp = weather.rain.precipitation
  let unit = 'mm'
  if (to_inch) {
    unit = 'pol'
    temp = temp / 25.4
  }
  return `${temp.toFixed(1)} ${unit}`
}


