import { Component, OnInit } from '@angular/core';
import {EmpleosService} from 'src/app/pages/puestodetrabajo/empleos/empleos.service';
import {TokenStorageService} from 'src/app/util/token-storage.service';

@Component({
  selector: 'app-listacandidatos',
  templateUrl: './listacandidatos.component.html',
  styleUrls: []
})
export class ListacandidatosComponent implements OnInit {
  ListCandidatos: any = [];
  Listprofile: any = [];

  constructor(private empleoservice:EmpleosService, private token:TokenStorageService) { }

  ngOnInit(): void {
    this.getEmpleobyPostulante();
  }

  getEmpleobyPostulante(){
    this.empleoservice.getPublicacionbyPostulante(this.token.getTokenjob()).subscribe(data => {
      this.ListCandidatos = data;
      this.Listprofile = this.ListCandidatos.postulantesPublicacion;
      console.log(this.ListCandidatos);
    })
  }

}
