import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const getUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/activeposts';
const getPostbyEmpleo = 'https://backend-kaizentalent.herokuapp.com/api/publicacion';
const pUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/pausedposts';
const noUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/noactiveposts';

const pausar = 'https://backend-kaizentalent.herokuapp.com/api/publicacion/update/estado/pausa';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmpleosService {

  constructor(private http:HttpClient) { }

  getActivos(idrec:any){
    return this.http.get(`${getUrl}?id=${idrec}`);
  }

  getPublicacionbyPostulante(idpt:any){
    return this.http.get(`${getPostbyEmpleo}/${idpt}/show/postulantes`);
  }

  getPublicacionNoActive(idno:any){
    return this.http.get(`${noUrl}?id=${idno}`);
  }

  getPublicacionPaused(idpau:any){
    return this.http.get(`${pUrl}?id=${idpau}`);
  }

  putPublicacionpausa(idpausar:any): Observable<any>{

    return this.http.put(pausar,
                        idpausar,
                        httpOptions);               
  }
}
