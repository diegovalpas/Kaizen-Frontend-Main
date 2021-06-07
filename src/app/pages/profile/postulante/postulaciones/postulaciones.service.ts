import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const misPostulaciones = 'https://backend-kaizentalent.herokuapp.com/api/postulante';


@Injectable({
  providedIn: 'root'
})
export class PostulacionesService {

  constructor(private http: HttpClient) { }

  getMisPostulaciones(idpostu:any): Observable<any> {
    return this.http.get(`${misPostulaciones}/${idpostu}/show/postulaciones`)
  }
}

