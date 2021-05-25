import { Component, OnInit } from '@angular/core';
import {EmpleosService} from 'src/app/pages/puestodetrabajo/empleos/empleos.service';
import {TokenStorageService} from 'src/app/util/token-storage.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-listacandidatos',
  templateUrl: './listacandidatos.component.html',
  styleUrls: []
})
export class ListacandidatosComponent implements OnInit {
  
  //Variables
  ListCandidatos: any = [];
  Listprofile: any = [];
  ListCandidatosCurrent: any = [];

  constructor(private empleoservice:EmpleosService, private token:TokenStorageService,private route:Router) { }

  ngOnInit(): void {
    this.getPostulantes();
  }

  getPostulantes(){
    this.empleoservice.getPublicacionbyPostulante(this.token.getTokenjob()).subscribe(data => {
      this.ListCandidatos = data;
      this.Listprofile = this.ListCandidatos.postulantesPublicacion;
    })
  }

  Seleccionarcandidato(lista:any) {
    this.ListCandidatosCurrent = lista;
    this.token.saveUsuarioPerfil(this.ListCandidatosCurrent.idPostulante);
  }

  redirect(){
    this.route.navigate(['/perfilcandidato']);
  }

}
