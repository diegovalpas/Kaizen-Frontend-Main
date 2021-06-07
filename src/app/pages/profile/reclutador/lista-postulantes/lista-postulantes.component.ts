import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { ListaPostulantesService } from './lista-postulantes.service';

@Component({
  selector: 'app-lista-postulantes',
  templateUrl: './lista-postulantes.component.html',
  styleUrls: []
})
export class ListaPostulantesComponent implements OnInit {

  
  
  //Variables
  ListCandidatos: any = [];
  Listprofile: any = [];
  ListCandidatosCurrent: any = [];


  constructor(private ListaPostulantesService: ListaPostulantesService, 
              private token:TokenStorageService,
              private route:Router) { }
 

  ngOnInit(): void {
    this.getPostulantes();
  }

  getPostulantes(){
    this.ListaPostulantesService.getPublicacionbyPostulante(this.token.getTokenjob()).subscribe(data => {
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
