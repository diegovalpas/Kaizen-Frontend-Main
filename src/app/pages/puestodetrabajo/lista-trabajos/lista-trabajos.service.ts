import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/home/show/all';
const auxUrl = 'https://backend-kaizentalent.herokuapp.com/api/home/show/puestostrabajo/by'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ListaTrabajosService {

  constructor( private http: HttpClient) { }

  ListaDeTrabajos(): Observable<any> {
    return this.http.get(baseUrl);
  }

  BusquedaListaParametros(nombrework:any,city:any,category:any,periodopubli:any,exp:any): Observable <any> {   
    return this.http.get(`${auxUrl}?puestotrabajo=${nombrework}&ciudad=${city}&categoria=${category}&periodopublicacion=${periodopubli}&experiencia=${exp}`);
  }

}
