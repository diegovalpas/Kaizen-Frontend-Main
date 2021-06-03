import { Component, OnInit } from '@angular/core';
import {ReclutadorProfileService} from '../reclutador-profile.service';
import {TokenStorageService} from 'src/app/util/token-storage.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-list-candidatos',
  templateUrl: './list-candidatos.component.html',
  styleUrls: []
})
export class ListCandidatosComponent implements OnInit {

  //Variables
  ListCandidatos: any = [];
  Listprofile: any = [];
  ListCandidatosCurrent: any = [];
  p:any = 1;
  Fotopostulante: any;
  Cvpostulante: any;

  constructor(private reclutadorservice:ReclutadorProfileService, private token:TokenStorageService,private route:Router) { }

  ngOnInit(): void {
    this.getPostulantes();
  }

  getPostulantes(){
    this.reclutadorservice.getPublicacionbyPostulante(this.token.getTokenjob()).subscribe(data => {
      this.ListCandidatos = data;
      this.Listprofile = this.ListCandidatos.postulantesPublicacion;
      this.Fotopostulante = this.Listprofile.fotoPostulante.urlImagen;
      this.Cvpostulante = this.Listprofile.cvPostulante.urlImagen;
      console.log(this.Listprofile);
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
