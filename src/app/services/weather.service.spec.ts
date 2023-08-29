import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';

import { WeatherData, WeatherEntry, get_temperature, getDate, getIcon } from '../models/weather';
describe('WeatherService', () => {
  let service: WeatherService;
  let weatherSample: WeatherData
  weatherSample = {
    "period": {
      "begin": "2017-02-01",
      "end": "2017-02-07"
    },
    "locale": {
      "id": 3735,
      "name": "Osasco",
      "state": "SP",
      "latitude": -23.532,
      "longitude": -46.792
    },
    "weather": [
      {
        "date": "2017-02-01",
        "text": "Sol com muitas nuvens durante o dia. Períodos de nublado, com chuva a qualquer hora.",
        "temperature": {
          "min": 20,
          "max": 28
        },
        "rain": {
          "probability": 60,
          "precipitation": 20
        }
      }]
  };
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
