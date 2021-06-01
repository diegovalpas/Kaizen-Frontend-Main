import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicInfoPostulanteProfile } from './postulante-profile-interface';

const BASE_URL = 'https://backend-kaizentalent.herokuapp.com/api/postulante';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PostulanteProfileService {

  constructor(private http: HttpClient) { }

  BasicInfo(id: any): Observable<any> {
    return this.http.get(
      `${BASE_URL}/${id}/profile/basicinfo`);
  }

  UpdateBasicInfo(postulante: BasicInfoPostulanteProfile, id: any): Observable<any> {
    return this.http.put(
      BASE_URL + `/${id}/update/fields`,
      postulante,
      httpOptions);
  }

  getMisPostulaciones(idpostu:any): Observable<any> {
    return this.http.get(`${BASE_URL}/${idpostu}/show/postulaciones`)
  }
}
