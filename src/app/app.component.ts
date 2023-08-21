import { WeatherService } from './services/weather.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { City } from './models/city';
import { WeatherData, WeatherEntry } from './models/weather';
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

  // Variáveis para controle das unidades de temperatura e chuva
  temperatureUnit: 'C' | 'F' = 'C';
  rainUnit: 'mm' | 'inch' = 'mm';

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
    //console.log("consume", this.cities3)
    //console.log(this.responseCities$.name)

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

    })


    this.myControl.setValue('');
  }

  // Função para alternar unidade de temperatura
  changeTemperatureUnit() {
    this.temperatureUnit = this.temperatureUnit === 'C' ? 'F' : 'C';
    this.updateTemperatureButtonText();
  }

  // Função para alternar unidade de chuva
  changeRainUnit() {
    this.rainUnit = this.rainUnit === 'mm' ? 'inch' : 'mm';
    this.updateRainButtonText();
  }

  // Função para atualizar o texto do botão de temperatura
  updateTemperatureButtonText() {
    this.temperatureButtonText = this.temperatureUnit === 'C' ? 'Alterar para Fahrenheit' : 'Alterar para Celsius';
  }

  // Função para atualizar o texto do botão de chuva
  updateRainButtonText() {
    this.rainButtonText = this.rainUnit === 'mm' ? 'Alterar para Polegadas' : 'Alterar para Milímetros';
  }

  // Função para formatar temperatura baseado na unidade
  formatTemperature(temperature: number): string {
    if (this.temperatureUnit === 'F') {
      // Converter para Fahrenheit
      temperature = (temperature * 9 / 5) + 32;
      return `${temperature.toFixed(2)} °F`;
    }
    return `${temperature.toFixed(2)} °C`;
  }

  // Função para formatar chuva (precipitação) baseado na unidade
  formatRain(rain: number | string): string {
    if (this.rainUnit === 'inch') {
      // Converter para polegadas
      const mmToInch = 0.0393701;
      const inches = parseFloat(rain as string) * mmToInch;
      return `${inches.toFixed(2)} in`;
    }
    return `${rain} mm`;
  }
}
