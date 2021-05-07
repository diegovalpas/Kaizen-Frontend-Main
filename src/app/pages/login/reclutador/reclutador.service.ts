import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReclutadorSigninRequest} from 'src/app/pages/signin/reclutador/reclutador-signin-interface';
import {authInterceptorProviders} from 'src/app/util/auth.interceptor'
import { ReclutadorUpdate } from './reclutador-interface';

const baseUrl = 'http://localhost:8080/api/reclutador';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReclutadorService {

  constructor(private http:HttpClient) { }

  auxlogoperfil = new File([], '');

  get(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/profile/basicinfo`);
  }

  update(usuario:ReclutadorUpdate,id:any): Observable<any> {
    return this.http.put(
      baseUrl+`/${id}/update/fields`,
      usuario,
      httpOptions
    );
  }

  updateLogo(logo: File,id:any): Observable<any> {
  
    var reclutador: FormData = new FormData();

    if (logo != null) {
      reclutador.append('logo', logo);
    }else {
      reclutador.append('logo', this.auxlogoperfil);
    }

    return this.http.put(
      baseUrl+`/${id}/update/logo`,
      reclutador);
  }

}
