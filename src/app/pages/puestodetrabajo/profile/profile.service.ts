import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/publicacion';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) {  }

  getEducacion(idpub:any, idpost:any): Observable<any> {
    return this.http.get(`${baseUrl}/${idpub}/postulante/${idpost}/profile/educacion`);
  }

  getExperiencia(idpub:any, idpost:any): Observable<any> {
    return this.http.get(`${baseUrl}/${idpub}/postulante/${idpost}/profile/experiencialaboral`);
  }
}

