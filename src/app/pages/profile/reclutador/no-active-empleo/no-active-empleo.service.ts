import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const noUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/noactiveposts';
const borrar = 'https://backend-kaizentalent.herokuapp.com/api/publicacion';
const perfilpostu ='https://backend-kaizentalent.herokuapp.com/api/publicacion';


@Injectable({
  providedIn: 'root'
})
export class NoActiveEmpleoService {

  constructor(private http:HttpClient) { }
  
  getPublicacionNoActive(idno:any){
    return this.http.get(`${noUrl}?id=${idno}`);
  }

  deleteEmpleo(idborrar: any) : Observable<any> {
    return this.http.delete(`${borrar}/${idborrar}/delete`);
  }


}
