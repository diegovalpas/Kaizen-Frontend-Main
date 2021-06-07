import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { PostulacionesService } from './postulaciones.service';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: []
})



export class PostulacionesComponent implements OnInit {
  MisPostulaciones: any;
  postulaciones: any;
  ListPostulacionesCurrent: any = [];
  p : number = 1 ;
  conteo: any;
  total: any;
 


  constructor(private fb:FormBuilder,
              private postulacionservice: PostulacionesService,
              private token: TokenStorageService,
              private route:Router) { }

  ngOnInit(): void {
    this.showMisPostulanciones();
  }

  showMisPostulanciones(){
    this.MisPostulaciones= this.token.getUser();
    this.postulacionservice.getMisPostulaciones(this.MisPostulaciones.idPostulante).subscribe(data => {
      this.postulaciones = data;
      this.conteo=this.postulaciones.length;
            
      
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
