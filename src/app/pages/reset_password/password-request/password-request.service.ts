import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PasswordRequest } from './password-request-interface';
import { Observable } from 'rxjs';

const AUTH_API = 'https://backend-kaizentalent.herokuapp.com/api/forgotpassword/sendemail';
//const AUTH_API = 'http://localhost:8080/api/forgotpassword/sendemail';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PasswordRequestService {

  constructor(private http: HttpClient) { }

  PasswordRequest(passwordRequest: PasswordRequest): Observable<any> {
    
    return this.http.post(
      AUTH_API,
      passwordRequest,
      httpOptions
    );
  }
}
