import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostulanteSignupRequest } from './postulante-signup-interface';

const AUTH_API = 'http://localhost:8080/api/postulante/signup';

@Injectable({
  providedIn: 'root'
})


export class PostulanteSignupService {

  constructor(private http: HttpClient) { }

  auxfotoperfil = new File([], '');
  auxarchivocv = new File([], '');

  SignUpPostulante(usuario: PostulanteSignupRequest, fotoperfil: File, archivocv: File): Observable<any> {
    
    const postulantedata = new Blob([JSON.stringify(usuario)], {type: 'application/json'})

    var postulante: FormData = new FormData();

    postulante.append('usuario', postulantedata);

    if (fotoperfil != null) {
      postulante.append('foto', fotoperfil);

      if (archivocv != null) {
        postulante.append('archivocv', archivocv);
      } else {
        postulante.append('archivocv', this.auxarchivocv);
      }
    } else {
      postulante.append('foto', this.auxfotoperfil);
    }

    if (archivocv != null) {
      postulante.append('archivocv', archivocv);

      if (fotoperfil != null) {
        postulante.append('foto', fotoperfil);
      } else {
        postulante.append('foto', this.auxfotoperfil);
      }
    } else {
      postulante.append('archivocv', this.auxarchivocv);
    }

    return this.http.post(
      AUTH_API, 
      postulante);
  }
}
