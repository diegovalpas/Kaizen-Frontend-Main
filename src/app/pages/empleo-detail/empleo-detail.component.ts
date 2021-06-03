import { Component, OnInit,  } from '@angular/core';
import {TokenStorageService} from 'src/app/util/token-storage.service';
import {Router} from '@angular/router';
import {EmpleoDetailService} from './empleo-detail.service'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-empleo-detail',
  templateUrl: './empleo-detail.component.html',
  styleUrls: []
})
export class EmpleoDetailComponent implements OnInit {

  //Variables
  isButtonVisible= false;
  PostulanteActual:any ;
  currentDetalleLista:any = [];
  auxUsertoken: any;
  message:any;

  constructor(private EmpleoDetailService:EmpleoDetailService,
    private tokens:TokenStorageService, 
    private route:Router) { }

  ngOnInit(): void {
    this.PostulanteActual = this.tokens.getUser();
    this.getdetalleEmpleo();
    this.verBoton();
  }

  verBoton(){

    if(this.tokens.getUser()){
      this.auxUsertoken = this.tokens.getUser()
      if(this.auxUsertoken.idReclutador !== undefined){
        
        
      }
      if(this.auxUsertoken.idPostulante !== undefined){
        this.isButtonVisible = true;
      }
    }
    if(this.tokens.getToken() === null){
      this.isButtonVisible = true;
    }
  }

  getdetalleEmpleo(){
    
    this.EmpleoDetailService.getdetalleLista(this.tokens.getTokenjob()).subscribe(
    data => {
      this.currentDetalleLista = data;
      console.log(this.currentDetalleLista);
    },
    error => {
      console.log(error);
    });
  }

  Postularempleo(){
    if(this.PostulanteActual.idPostulante != null || this.PostulanteActual.idPostulante != undefined  ){
        this.EmpleoDetailService.PostularTrabajoenDetalle(this.PostulanteActual.idPostulante,this.currentDetalleLista.idPuestoTrabajo).subscribe(
        data => {
          console.log(data);
          this.message = 'Postulacion exitosa'
      },
      error => {
        this.message = ''+error.error.message;
      })
    }else{
      this.message = 'Ingresar sesion | Debe ser un postulante'
      this.route.navigate(['/signin/postulante']);
    }
  }

}
