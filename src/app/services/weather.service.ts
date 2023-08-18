import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { WeatherData } from '../models/weather';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'localhost:8080/'
  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getWeather(id: number): Observable<WeatherData> {
    console.log("rodando o getWeather")
    return this.http.get<WeatherData>(`${this.url}weather/${id}`);
  }
}