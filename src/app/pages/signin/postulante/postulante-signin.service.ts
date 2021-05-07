import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostulanteSigninRequest } from './postulante-signin-interface';

const AUTH_API = 'http://localhost:8080/api/postulante/signin';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PostulanteSigninService {

  constructor(private http: HttpClient) { }

  SignInPostulante(usuario: PostulanteSigninRequest): Observable<any> {
    return this.http.post(
      AUTH_API,
      usuario,
      httpOptions
    );
  }
  

}
