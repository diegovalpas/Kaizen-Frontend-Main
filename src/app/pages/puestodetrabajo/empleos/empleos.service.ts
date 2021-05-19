import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const getUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/activeposts';
const getPostbyEmpleo = 'https://backend-kaizentalent.herokuapp.com/api/publicacion';
const pUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/pausedposts';
const noUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/noactiveposts';

const pausar = 'https://backend-kaizentalent.herokuapp.com/api/publicacion/update/estado/pausa';

const activar ='https://backend-kaizentalent.herokuapp.com/api/publicacion/update/estado/activo';

const borrar = 'https://backend-kaizentalent.herokuapp.com/api/publicacion';

const actualizar ='https://backend-kaizentalent.herokuapp.com/api/reclutador';

const perfilpostu ='https://backend-kaizentalent.herokuapp.com/api/publicacion';



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
  putPublicacionactivar(idactivar:any): Observable<any>{

    return this.http.put(activar,
                         idactivar,
                         httpOptions);               
  }

  deleteEmpleo(idborrar: any) : Observable<any> {
    return this.http.delete(`${borrar}/${idborrar}/delete`);
  }

  putPublicacionUpdate(puestoTrabajo:any,  idreclutador:any, idactualizar:any): Observable<any>{
    return this.http.put(`${actualizar}/${idreclutador}/publicacion/${idactualizar}/update`,
                          puestoTrabajo,
                          httpOptions);
  }

  getPostulantesByempleo(idpublicacion: any,idpostu:any) : Observable<any> {
    return this.http.get(`${perfilpostu}/${idpublicacion}/postulante/${idpostu}/profile/basicinfo`);
  }
}
