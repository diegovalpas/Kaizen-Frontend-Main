import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicInfoReclutadorProfile } from './reclutador-profile-interface';

const BASE_URL = 'https://backend-kaizentalent.herokuapp.com/api/reclutador';
//const BASE_URL = 'http://localhost:8080/api/reclutador';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ReclutadorProfileService {

  auxlogoperfil = new File([], '');

  constructor(private http: HttpClient) { }

  BasicInfo(id: any): Observable<any> {
    return this.http.get(
      `${BASE_URL}/${id}/profile/basicinfo`);
  }

  UpdateBasicInfo(reclutador: BasicInfoReclutadorProfile, id: any): Observable<any> {
    return this.http.put(
      BASE_URL + `/${id}/update/fields`,
      reclutador,
      httpOptions);
  }

  updateLogo(logo: File,id:any): Observable<any> {
  
    var reclutador: FormData = new FormData();

    if (logo != null) {
      reclutador.append('logo', logo);
    }else {
      reclutador.append('logo', this.auxlogoperfil);
    }

    return this.http.put(
      BASE_URL+`/${id}/update/logo`,
      reclutador);
  }

  

}
