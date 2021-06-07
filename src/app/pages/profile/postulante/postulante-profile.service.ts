import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicInfoPostulanteProfile } from './postulante-profile-interface';

const BASE_URL = 'https://backend-kaizentalent.herokuapp.com/api/postulante';
//const BASE_URL = 'http://localhost:8080/api/postulante';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PostulanteProfileService {

  auxfoto = new File([], '');
  auxcv = new File([], '');

  constructor(private http: HttpClient) { }

  BasicInfo(id: any): Observable<any> {
    return this.http.get(
      `${BASE_URL}/${id}/profile/basicinfo`);
  }

  updateLogo(foto:File, id:any): Observable<any> {

    var postulante: FormData = new FormData();

    if (foto != null) {
      postulante.append('foto', foto);
    }else {
      postulante.append('foto', this.auxfoto);
    }
    
    return this.http.put(
      BASE_URL+`/${id}/update/foto`,  
      postulante      
    )
  }

  updatecv(cv:File, id:any): Observable<any> {

    var postulante: FormData = new FormData();

    if (cv != null) {
      postulante.append('archivocv', cv);
    }else {
      postulante.append('archivocv', this.auxcv);
    }
    
    return this.http.put(
      BASE_URL+`/${id}/update/cv`,  
      postulante      
    )
  }

  UpdateBasicInfo(postulante: BasicInfoPostulanteProfile, id: any): Observable<any> {
    return this.http.put(
      BASE_URL + `/${id}/update/fields`,
      postulante,
      httpOptions);
  }


}
