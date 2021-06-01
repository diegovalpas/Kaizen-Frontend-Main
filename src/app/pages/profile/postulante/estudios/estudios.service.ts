import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const deleteEdu =  'https://backend-kaizentalent.herokuapp.com/api/educacion';
const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/postulante';
const updateEdu = 'https://backend-kaizentalent.herokuapp.com/api';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {

  constructor(private http: HttpClient) { }

  guardarEducacion(id:any, educacion:any): Observable<any> {

    return this.http.post(
      `${baseUrl}/${id}/agregar/educacion`, 
      educacion,
      httpOptions);
  }
  
  mostrarEducacion(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/educacion/show`);
  }

  borrarEducacion(id:any): Observable<any>{
    return this.http.delete(`${deleteEdu}/${id}/delete`);
  }

  actualizarEducacion(id:any, educacionr:any): Observable<any>{
    return this.http.put(`${updateEdu}/educacion/${id}/update`, educacionr);
  }
}
