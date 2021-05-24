import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostulanteSignupRequest } from './postulante-signup-interface';

const AUTH_API = 'https://backend-kaizentalent.herokuapp.com/api/postulante/signup';

@Injectable({
  providedIn: 'root'
})

export class PostulanteSignupService {

  //Variables
  auxfotoperfil = new File([], '');
  auxarchivocv = new File([], '');

  constructor(private http: HttpClient) {}

  SignUpPostulante(usuario: PostulanteSignupRequest, fotoperfil: File, archivocv: File): Observable<any> {
    
    const postulantedata = new Blob([JSON.stringify(usuario)], {type: 'application/json'})

    var postulante: FormData = new FormData();

    postulante.append('usuario', postulantedata);

    //Condicional de Foto de perfil
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

    //Condicional de archivo CV
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
    return this.http.post(AUTH_API , postulante);
  }
}
