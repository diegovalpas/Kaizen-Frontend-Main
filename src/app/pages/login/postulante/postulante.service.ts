import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PostulanteSigninRequest} from 'src/app/pages/signin/postulante/postulante-signin-interface';
import {authInterceptorProviders} from 'src/app/util/auth.interceptor'
import { PostulanteUpdate } from './postulante-interface';

const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/postulante';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})

export class PostulanteService {

  constructor(private http:HttpClient) { }
  
  get(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/profile/basicinfo`);
  }
  
  update(usuario:PostulanteUpdate,id:any): Observable<any> {
    return this.http.put(
      baseUrl+`/${id}/update/fields`,
      usuario,
      httpOptions
    );
  }

  
  updateLogo(file:PostulanteUpdate,id:any): Observable<any> {
    return this.http.put(
      baseUrl+`/${id}/update/logo`,  
      file,
      httpOptions
    );
  }


}
