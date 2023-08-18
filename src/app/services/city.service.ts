import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  url = 'https://raw.githubusercontent.com/VictorGuui/challenge-accepted/master/base/locales.json'
  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getCity(): Observable<City[]> {
    console.log("rodando o getcity")
    return this.http.get<City[]>(this.url);
  }
}

/* // Manipulação de erros
handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Erro ocorreu no lado do client
    errorMessage = error.error.message;
  } else {
    // Erro ocorreu no lado do servidor
    errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
};}
 */

