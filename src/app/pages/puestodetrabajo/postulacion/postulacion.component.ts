import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PostulacionService} from './postulacion.service';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: []
})
export class PostulacionComponent implements OnInit {
  postulaciones: any;
  ObjPostulante:any
  ListPostulacionesCurrent: any = [];
  postulo = true;

  constructor( private fb:FormBuilder,
               private postulacionservice: PostulacionService,
               private token: TokenStorageService, private route:Router) { }

  ngOnInit(): void {
    this.showPostulantes();
  }
//'postulante/:idPostulante/postulaciones'
  showPostulantes(){
    this.ObjPostulante= this.token.getUser();
    this.postulacionservice.getListadePostulantes(this.ObjPostulante.idPostulante).subscribe(data => {
      this.postulaciones = data;
      console.log(this.postulaciones);
    })
  }

  Seleccionarpostulacion(lista:any) {
    this.ListPostulacionesCurrent = lista;
    console.log(this.ListPostulacionesCurrent);
  }

  //Ir a publicacion del trabajo
  verDetalle(){
    this.token.saveTokenjob(this.ListPostulacionesCurrent.idPuestoTrabajo);
    
    this.route.navigate(['puestotrabajo/'+this.ListPostulacionesCurrent.idPuestoTrabajo+'/detail']);
  }
}
