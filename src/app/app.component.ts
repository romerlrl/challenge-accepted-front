import { WeatherService } from './services/weather.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { City } from './models/city';
import { WeatherData, WeatherEntry, get_temperature, get_precipitation, getDate, getIcon } from './models/weather';
import { CityService } from './services/city.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  city = {} as City;
  //@ViewChild("myName") myName2: ElementRef;
  options: City[]
  myControl = new FormControl();
  filteredOptions: Observable<City[]>;

  selectedCity: WeatherData | null = null;
  formatTemperature = get_temperature;
  formatRain = get_precipitation;
  formatDate = getDate;
  formatProbability = getIcon
  // Variáveis para controle das unidades de temperatura e chuva
  temperatureUnitInCelsius: boolean = true
  rainUnitInPol: boolean = false;

  // Texto dos botões para alterar unidades
  temperatureButtonText = 'Alterar para Fahrenheit';
  rainButtonText = 'Alterar para Polegadas';

  constructor(private cityService: CityService, private weatherService: WeatherService) {

  }
  ngOnInit() {
    //this.myControl.setValue('Escolha sua cidade');

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

  onSubmit() {
    const cityName = this.myControl.value.name;
    const cityId = this.myControl.value.id

    //this.selectedCity = weatherData.find((data: WeatherData) => data.locale.name === cityName) || null;
    const reqWeather = this.weatherService.getWeather(cityId)

    reqWeather.subscribe((data) => {
      console.log("weather", data)
      this.selectedCity = data;
      console.log(typeof data.weather[0].date)
    })
    this.myControl.setValue(cityName);
  }

}
