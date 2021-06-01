import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PasswordUpdate } from './password-update-interface';

const BASE_URL = 'https://backend-kaizentalent.herokuapp.com/api';
//const BASE_URL = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PasswordUpdateService {

  constructor(private http: HttpClient) { }

  /*GetPasswordUpdateTemplate(token: any): Observable<any> {
    
    return this.http.get(`${BASE_URL}/${token}`);
  }*/

  PasswordUpdate(passwordUpdate: PasswordUpdate): Observable<any> {

    return this.http.put(
      BASE_URL + `/forgotpassword/update`,
      passwordUpdate,
      httpOptions
      );
  }
}
