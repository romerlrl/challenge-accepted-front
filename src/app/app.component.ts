import { switchTemperatureUnit, switchVolumeUnit, getTemperatureUnit, getVolumeUnit } from './services/local-storage.service';
import { WeatherService } from './services/weather.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { City, showCity } from './models/city';
import { WeatherData, WeatherEntry, get_temperature, get_precipitation, getDate, getIcon } from './models/weather';
import { CityService } from './services/city.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  city = {} as City;
  options: City[]
  myControl = new FormControl("", []);
  filteredOptions: Observable<City[]>;
  cityDisplayWith = showCity;
  selectedCity: WeatherData | null = null;
  formatTemperature = get_temperature;
  formatRain = get_precipitation;
  formatDate = getDate;
  formatProbability = getIcon

  storage: Storage = window.localStorage;
  changeTemperatureUnit = switchTemperatureUnit
  changeVolumeUnit = switchVolumeUnit
  // Variáveis para controle das unidades de temperatura e chuva
  temperatureUnitInCelsius: boolean = getTemperatureUnit()
  rainUnitInPol: boolean = getVolumeUnit()

  // Texto dos botões para alterar unidades
  temperatureButtonText = 'Alterar para Fahrenheit';
  rainButtonText = 'Alterar para Polegadas';

  constructor(private cityService: CityService, private weatherService: WeatherService) {

  }
  ngOnInit() {
    const req = this.cityService.getCity();

    req.subscribe((data) => {
      this.options = data
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === "string" ? value : value.name)),
        map(name => (name ? this._filter_city(name) : this.options.slice()))
      );
      console.log(this.options)
    });
  }

  private _filter_city(name: string): City[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
  clickSubmit(selected: City) {
    let cityId = selected.id
    const reqWeather = this.weatherService.getWeather(cityId)
    reqWeather.subscribe((data) => {
      console.log("weather", data)
      this.selectedCity = data;
      console.log(typeof data.weather[0].date)
    })
  }

  onSubmit() {
    console.log(this.myControl.value, typeof this.myControl.value)
    const cityName = this.myControl.value.name;
    const cityId = this.myControl.value.id
    console.log("linha 64", cityId)
    if (!cityId) {
      //exibir um "cidade não encontrada"?
      return
    }
    const reqWeather = this.weatherService.getWeather(cityId)

    reqWeather.subscribe((data) => {
      console.log("weather", data)
      this.selectedCity = data;
      console.log(typeof data.weather[0].date)
    })
  }
}
