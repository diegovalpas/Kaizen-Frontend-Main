import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const urlLookFor = 'https://backend-kaizentalent.herokuapp.com/api/index/send/filterparameters';
const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/index/show/puestostrabajo/all';
const urlFull = 'https://backend-kaizentalent.herokuapp.com/api/index/show/puestostrabajo/by/fulltime';

const urlPart = 'https://backend-kaizentalent.herokuapp.com/api/index/show/puestostrabajo/by/parttime';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private http:HttpClient) { }

  postBusqueda(ptrabajou: string, pciudadu: string, pcategoriau:string): Observable<any> {    

    var busqueda: FormData = new FormData();

    busqueda.append('puestotrabajo', ptrabajou);
    busqueda.append('ciudad', pciudadu);
    busqueda.append('categoria', pcategoriau);   


    return this.http.post(
      urlLookFor, 
      busqueda);
  }

  getListaparamsfull(): Observable<any> {
    return this.http.get(urlFull);
  }
  getListaparamspart(): Observable<any> {
    return this.http.get(urlPart);
  }
  getListaparams(): Observable<any> {
    return this.http.get(baseUrl);
  }

}

  

