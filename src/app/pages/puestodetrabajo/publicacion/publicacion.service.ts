import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/reclutador';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor( private http: HttpClient) { }

  Publicar(puesto:any,id:any): Observable<any> {
    return this.http.post(
      baseUrl+`/${id}/publicar`,
      puesto,
      httpOptions
    );
}


}
