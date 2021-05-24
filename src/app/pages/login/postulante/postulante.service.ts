import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostulanteUpdate } from './postulante-interface';

const edexpUrl =  'https://backend-kaizentalent.herokuapp.com/api/educacion';
const dexpUrl =  'https://backend-kaizentalent.herokuapp.com/api/experiencialaboral';

const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/postulante';

const update = 'https://backend-kaizentalent.herokuapp.com/api';

const passwordupdate = 'https://backend-kaizentalent.herokuapp.com/api/forgotpassword/sendemail';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})

export class PostulanteService {

  constructor(private http:HttpClient) { }
  auxfoto = new File([], '');

  getUserLogin(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/profile/basicinfo`);
  }
  
  update(usuario:PostulanteUpdate,id:any): Observable<any> {
    return this.http.put(
      baseUrl+`/${id}/update/fields`,
      usuario,
      httpOptions
    );
  }

  
  updateLogo(foto:File, id:any): Observable<any> {

    var postulante: FormData = new FormData();

    if (foto != null) {
      postulante.append('foto', foto);
    }else {
      postulante.append('foto', this.auxfoto);
    }
    
    return this.http.put(
      baseUrl+`/${id}/update/foto`,  
      postulante      
    );
  }

  guardarEducacion(id:any, educacion:any): Observable<any> {

    return this.http.post(
      `${baseUrl}/${id}/agregar/educacion`, 
      educacion,
      httpOptions);
  }

  guardarExperiencia(id: any, experiencia: any): Observable<any> {

    return this.http.post(
      `${baseUrl}/${id}/agregar/experiencialaboral`, 
      experiencia,
      httpOptions); 
  }

  mostrarExperiencia(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/experiencialaboral/show`);
  }

  mostrarEducacion(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/educacion/show`);
  }

  borrarExperiencia(id:any): Observable<any>{
    return this.http.delete(`${dexpUrl}/${id}/delete`);
  }

  borrarEducacion(id:any): Observable<any>{
    return this.http.delete(`${edexpUrl}/${id}/delete`);
  }

  actualizarEducacion(id:any, educacionr:any): Observable<any>{
    return this.http.put(`${update}/educacion/${id}/update`, educacionr);
  }

  getEmail(email: any): Observable<any> {

    var emailPostulante: FormData = new FormData();

    emailPostulante.append('email', email);

    return this.http.post(
      passwordupdate,
      emailPostulante
    );
  }


}
