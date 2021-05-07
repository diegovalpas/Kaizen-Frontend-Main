import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/puestrotrabajo';

@Injectable({
  providedIn: 'root'
})
export class DetalletrabajoService {

  constructor(private http:HttpClient) { }

  getdetalleLista(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/detail`);
  }
}
