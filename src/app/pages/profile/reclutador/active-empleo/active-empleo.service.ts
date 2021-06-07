import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const getUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador/profile/activeposts';

const pausar = 'https://backend-kaizentalent.herokuapp.com/api/publicacion/update/estado/pausa';


const borrar = 'https://backend-kaizentalent.herokuapp.com/api/publicacion';

const actualizar ='https://backend-kaizentalent.herokuapp.com/api/reclutador';

const perfilpostu ='https://backend-kaizentalent.herokuapp.com/api/publicacion';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ActiveEmpleoService {

  constructor(private http:HttpClient) { }

  getActivos(idrec:any){
    return this.http.get(`${getUrl}?id=${idrec}`);
  }
  
  putPublicacionpausa(idpausar:any): Observable<any>{

    return this.http.put(pausar,
                        idpausar,
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

  
  
}
