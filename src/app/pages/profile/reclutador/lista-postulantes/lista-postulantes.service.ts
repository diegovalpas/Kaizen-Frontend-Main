import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const getPostbyEmpleo = 'https://backend-kaizentalent.herokuapp.com/api/publicacion';



@Injectable({
  providedIn: 'root'
})
export class ListaPostulantesService {

  constructor(private http:HttpClient) { }
  

  getPublicacionbyPostulante(idpt:any){
    return this.http.get(`${getPostbyEmpleo}/${idpt}/show/postulantes`);
  }
  
}
