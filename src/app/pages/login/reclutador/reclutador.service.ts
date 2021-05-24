import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReclutadorUpdate } from './reclutador-interface';

const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador';

const passwordupdate = 'https://backend-kaizentalent.herokuapp.com/api/forgotpassword/sendemail';

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

  getEmail(email: any): Observable<any> {

    return this.http.post(
      passwordupdate,
      email,
      httpOptions
    );
  }
}
