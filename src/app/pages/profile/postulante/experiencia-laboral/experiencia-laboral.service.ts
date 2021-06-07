import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



//const BASE_URL = 'http://localhost:8080/api/postulante';
const deleteExp =  'https://backend-kaizentalent.herokuapp.com/api/experiencialaboral';
const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/postulante';
const updateExp = 'https://backend-kaizentalent.herokuapp.com/api';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ExperienciaLaboralService {

  constructor(private http: HttpClient) { }

  guardarExperiencia(id: any, experiencia: any): Observable<any> {

    return this.http.post(
      `${baseUrl}/${id}/agregar/experiencialaboral`, 
      experiencia,
      httpOptions); 
  }

  mostrarExperiencia(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/experiencialaboral/show`);
  }

  borrarExperiencia(id:any): Observable<any>{
    return this.http.delete(`${deleteExp}/${id}/delete`);
  }

  actualizarExperiencia(id:any, experienciar:any): Observable<any>{
    return this.http.put(`${updateExp}/experiencialaboral/${id}/update`, experienciar);
  }
}
