import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicInfoReclutadorProfile } from './reclutador-profile-interface';

const BASE_URL = 'https://backend-kaizentalent.herokuapp.com/api/reclutador';
const activeUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/activeposts';
const activar ='https://backend-kaizentalent.herokuapp.com/api/publicacion/update/estado/activo';
const pauseUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/pausedposts';
const pausar = 'https://backend-kaizentalent.herokuapp.com/api/publicacion/update/estado/pausa';
const noUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/noactiveposts';
const getPostbyEmpleo = 'https://backend-kaizentalent.herokuapp.com/api/publicacion';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ReclutadorProfileService {

  //variables
  auxlogoperfil: any;

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

  getActivos(idrec:any){
    return this.http.get(`${activeUrl}?id=${idrec}`);
  }

  putPublicacionactivar(idactivar:any): Observable<any>{

    return this.http.put(activar,
                         idactivar,
                         httpOptions);               
  }

  getPublicacionPaused(idpau:any){
    return this.http.get(`${pauseUrl}?id=${idpau}`);
  }

  getPostulantesByempleo(idpublicacion: any,idpostu:any) : Observable<any> {
    return this.http.get(`${getPostbyEmpleo}/${idpublicacion}/postulante/${idpostu}/profile/basicinfo`);
  }

  putPublicacionpausa(idpausar:any): Observable<any>{

    return this.http.put(pausar,
                        idpausar,
                        httpOptions);               
  }

  getPublicacionNoActive(idno:any){
    return this.http.get(`${noUrl}?id=${idno}`);
  }

  putPublicacionUpdate(puestoTrabajo:any,  idreclutador:any, idactualizar:any): Observable<any>{
    return this.http.put(`${BASE_URL}/${idreclutador}/publicacion/${idactualizar}/update`,
                          puestoTrabajo,
                          httpOptions);
  }

  deleteEmpleo(idborrar: any) : Observable<any> {
    return this.http.delete(`${getPostbyEmpleo}/${idborrar}/delete`);
  }

  Publicarempleo(puesto:any,id:any): Observable<any> {
    return this.http.post(
      BASE_URL+`/${id}/publicar`,
      puesto,
      httpOptions
    );
  }

  getPublicacionbyPostulante(idpt:any){
    return this.http.get(`${getPostbyEmpleo}/${idpt}/show/postulantes`);
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

  getEducacion(idpub:any, idpost:any): Observable<any> {
    return this.http.get(`${getPostbyEmpleo}/${idpub}/postulante/${idpost}/profile/educacion`);
  }

  getExperiencia(idpub:any, idpost:any): Observable<any> {
    return this.http.get(`${getPostbyEmpleo}/${idpub}/postulante/${idpost}/profile/experiencialaboral`);
  }
}
