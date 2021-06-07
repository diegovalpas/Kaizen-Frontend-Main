
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const pUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/pausedposts';
const activar ='https://backend-kaizentalent.herokuapp.com/api/publicacion/update/estado/activo';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};



@Injectable({
  providedIn: 'root'
})
export class PausedEmpleoService {

  constructor(private http:HttpClient) { }

  getPublicacionPaused(idpau:any){
    return this.http.get(`${pUrl}?id=${idpau}`);
  }

  
  putPublicacionactivar(idactivar:any): Observable<any>{

    return this.http.put(activar,
                         idactivar,
                         httpOptions);               
  }
  
}
