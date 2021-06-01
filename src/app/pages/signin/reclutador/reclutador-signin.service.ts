import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReclutadorSignin } from './reclutador-signin-interface';

const AUTH_API = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/signin';
//const AUTH_API = 'http://localhost:8080/api/reclutador/signin';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReclutadorSigninService {

  constructor(private http: HttpClient) { }

  SignInReclutador(usuario: ReclutadorSignin): Observable<any> {
    return this.http.post(
      AUTH_API,
      usuario,
      httpOptions
    ); 
  }
}
