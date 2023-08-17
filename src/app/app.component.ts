import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, VERSION, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgForOf, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { City } from './models/city';
import { CityService } from './services/city.service';
/**
 * @title Filter autocomplete
 */


@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  city = {} as City;
  //options: City[];
  title = 'angular-climatempo-frontend';
  //name: string
  name = 'Angular';
  @ViewChild("myName") myName2: ElementRef;

  constructor(private cityService: CityService) { }

  options: City[] = [
    {
      "id": 3735,
      "name": "Osasco",
      "state": "SP",
      "latitude": -23.5320,
      "longitude": -46.7920
    },
    {
      "id": 3477,
      "name": "São Paulo",
      "state": "SP",
      "latitude": -23.5480,
      "longitude": -46.6360
    },
    {
      "id": 2147,
      "name": "São Carlos",
      "state": "SP",
      "latitude": -23.5480,
      "longitude": -46.6360
    },
    {
      "id": 4677,
      "name": "São Bernardo",
      "state": "SP",
      "latitude": -23.5480,
      "longitude": -46.6360
    },
    {
      "id": 3470,
      "name": "Saquarema",
      "state": "RJ",
      "latitude": -23.5480,
      "longitude": -46.6360
    },
    {
      "id": 3007,
      "name": "Rio de Janeiro",
      "state": "RJ",
      "latitude": -23.5480,
      "longitude": -46.6360
    },
    {
      "id": 3447,
      "name": "Rio das Ostras",
      "state": "RJ",
      "latitude": -23.5480,
      "longitude": -46.6360
    }
  ];
  options3 = ["são paulo", "osasco"]

  //options = this.options2.map((city) => city.name);

  //getCities();
  myControl = new FormControl();
  cities: City[];
  loading: boolean = false;
  errorMessage: String = "";

  filteredOptions: Observable<City[]>;
  /* getCities() {
    this.cityService.getCities().subscribe((city: City[]) => {
      this.options = city;
    });
  }
  public getCities() {
    this.cityService.getCities()
      .subscribe(
        cities => this.cities = cities);
  }*/

  public getCity() {
    console.log("obs")
    this.loading = true;
    this.errorMessage = "";
    this.cityService.getCities()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          this.cities = response;
          console.log(response)
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed
          this.loading = false;
        })
  }



  ngOnInit() {


    this.cityService.getCities()
    console.log("observable", this.cities)

    console.log("options", this.options)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter_city(name) : this.options.slice()))
    );
  }
  // Testes para isso aqui:
  private _filter_city(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
  /* private _filter_string(value: string): string[] {
    console.log(value)
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  } */
  onSubmit() {
    console.log("Form Submitted", this.myControl.value)
    let info: City = this.myControl.value
    this.myControl.setValue(info.name);
    console.log("this mycontrol value", this.myControl.value, "--")
    console.log("info", info)
    this.myName2.nativeElement.innerHTML = "<h1>Previsão do tempo para " + info.name + "</h1>";

    //console.log(this.contactForm.value)
  }
}
