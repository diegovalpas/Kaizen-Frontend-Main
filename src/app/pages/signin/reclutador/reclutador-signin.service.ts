import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReclutadorSigninRequest } from './reclutador-signin-interface';

const AUTH_API = 'http://localhost:8080/api/reclutador/signin';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReclutadorSigninService {

  constructor(private http: HttpClient) { }

  SignInReclutador(usuario: ReclutadorSigninRequest): Observable<any> {
    return this.http.post(
      AUTH_API,
      usuario,
      httpOptions
    ); 
  }
}
