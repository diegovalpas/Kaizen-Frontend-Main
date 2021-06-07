import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute,Router, ParamMap} from '@angular/router';
import { NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {ProfilePostulanteService} from './profile-postulante.service'

@Component({
  selector: 'app-profile-postulante',
  templateUrl: './profile-postulante.component.html',
  styleUrls: []
})
export class ProfilePostulanteComponent implements OnInit {
  CurrentEducacion: any;
  CurrentUser: any;
  CurrentExperiencia: any;
  
  Usuario: any = {   
  }
    
  

  idPostulante: any;
  fotoperfilPostulante: any;
  nombrePostulante: any;
  apellidoPostulante: any;
  descripcionPostulante: any;
  emailPostulante: any;
  telefonoPostulante: any;


  constructor(private tokens:TokenStorageService,
              private ProfilePostulanteService:ProfilePostulanteService,
              public modal:NgbModal) { }

  ngOnInit(): void {
    this.getpostulantexempleo();
    this.getEdu();
    this.getExp();
  }

  
  

  getpostulantexempleo(){
    this.ProfilePostulanteService.getPostulantesByempleo(this.tokens.getTokenjob(),this.tokens.getUsuarioPerfil()).subscribe(data => {
      this.Usuario = data
      this.Usuario.idPostulante= data.idPostulante
      this.Usuario.fotoperfilPostulante = data.fotoperfilPostulante.urlImagen;
      this.Usuario.nombrePostulante = data.nombrePostulante;
      this.Usuario.apellidoPostulante = data.apellidoPostulante;
      this.Usuario.descripcionPostulante = data.descripcionPostulante;
      this.Usuario.emailPostulante = data.emailPostulante;
      this.Usuario.direccionPostulante = data.direccionPostulante;
      this.Usuario.telefonoPostulante= data.telefonoPostulante;
      this.Usuario.tituloPostulante=data.tituloPostulante
      console.log(data);

      if (this.Usuario.descripcionPostulante){ 
        this.Usuario.descripcionPostulante = this.Usuario.descripcionPostulante.replace(/\n/g, '<br />');
      }

      
    })
  }

  getEdu(){

    this.ProfilePostulanteService.getEducacion(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentEducacion= data;  
        console.log(data)
      });
  }

  getExp(){

    this.ProfilePostulanteService.getExperiencia(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentExperiencia= data;  
        console.log(data)
      });
  }

}
