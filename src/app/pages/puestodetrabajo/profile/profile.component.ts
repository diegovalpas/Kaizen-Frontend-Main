import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute,Router, ParamMap} from '@angular/router';
import { EmpleosService} from 'src/app/pages/puestodetrabajo/empleos/empleos.service';
import { NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {ProfileService} from './profile.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  iduser:any;
  CurrentUser:any = [];
  CurrentEducacion: any ;
  CurrentExperiencia: any = [];

  /*Usuario : PostulanteBasicInfoResponse = {
    nombrePostulante : '',
    apellidoPostulante: '',
    ciudadPostulante: '',
    tipodocumentoPostulante: '',
    numerodocumentoPostulante: '',
    fecharegistroPostulante: '',
    generoPostulante: ''
  };*/


  constructor(private tokens:TokenStorageService,
    private empleoservice:EmpleosService,
    private ProfileService:ProfileService,
    public modal:NgbModal) { }

  ngOnInit(): void {
    this.getpostulantexempleo();
    this.getEdu();
    this.getExp();
  }

  getpostulantexempleo(){
    this.empleoservice.getPostulantesByempleo(this.tokens.getTokenjob(),this.tokens.getUsuarioPerfil()).subscribe(data => {
      this.CurrentUser = data;
      console.log(this.CurrentUser);
    })
  }

  getEdu(){

    this.ProfileService.getEducacion(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentEducacion= data;  
        console.log(data)
      });
  }

  getExp(){

    this.ProfileService.getExperiencia(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentExperiencia= data;  
        console.log(data)
      });
  }

}
