import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/home/show/puestostrabajo/all';
const urlPart = 'http://localhost:8080/api/home/show/puestostrabajo/by/parttime';
const urlFull = 'http://localhost:8080/api/home/show/puestostrabajo/by/fulltime';
const urlLookFor = 'http://localhost:8080/api/home/send/filterparameters';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getListaparams(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getListaparamspart(): Observable<any> {
    return this.http.get(urlPart);
  }

  getListaparamsfull(): Observable<any> {
    return this.http.get(urlFull);
  }


  postBusqueda(ptrabajou: string, pciudadu: string, pcategoriau:string): Observable<any> {    

    var busqueda: FormData = new FormData();

    busqueda.append('puestotrabajo', ptrabajou);
    busqueda.append('ciudad', pciudadu);
    busqueda.append('categoria', pcategoriau);   


    return this.http.post(
      urlLookFor, 
      busqueda);
  }


}