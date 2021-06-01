import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/puestotrabajo';
const basePostular = 'https://backend-kaizentalent.herokuapp.com/api/postulante';

@Injectable({
  providedIn: 'root'
})
export class EmpleoDetailService {

  constructor(private http:HttpClient) { }
  
  getdetalleLista(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/detail`);
  }
  
  PostularTrabajoenDetalle(idpostulante:any,idpuesto:any): Observable<any> {

    var puestotrabajo: FormData = new FormData();

    puestotrabajo.append('idpuestotrabajo', idpuesto);

    return this.http.post(
      basePostular+`/${idpostulante}/postular/puestotrabajo`,
      puestotrabajo
    );
  }
}
