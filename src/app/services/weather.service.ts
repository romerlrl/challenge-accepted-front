import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { WeatherData } from '../models/weather';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = environment.API_URL
  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getWeather(id: number): Observable<WeatherData> {
    console.log("rodando o getWeather")
    const full = `${this.url}weather/${id}`
    console.log("get weather link: ", full)
    return this.http.get<WeatherData>(full);
  }
}