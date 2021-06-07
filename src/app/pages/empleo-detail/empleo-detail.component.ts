import { Component, OnInit, Input } from '@angular/core';
import {TokenStorageService} from 'src/app/util/token-storage.service';
import {Router} from '@angular/router';
import {EmpleoDetailService} from './empleo-detail.service'
import { FormBuilder,FormControl, Validators } from '@angular/forms';

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

  constructor(private EmpleoDetailService:EmpleoDetailService,
              private tokens:TokenStorageService, 
              private route:Router,
              private fb:FormBuilder) {  }

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
      this.currentDetalleLista.imagen = data.logoEmpresa.urlImagen;
      this.currentDetalleLista.descripcionPuestoTrabajo = data.descripcionPuestoTrabajo
      console.log(this.currentDetalleLista);
      if (this.currentDetalleLista.descripcionPuestoTrabajo){ 
        this.currentDetalleLista.descripcionPuestoTrabajo = this.currentDetalleLista.descripcionPuestoTrabajo.replace(/\n/g, '<br />');
      }
     
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
      });
    }else{
      var aviso = "Debe ser postulante para realizar esta acción || debes de iniciar sesion";
      console.log(aviso);
      this.route.navigate(['/signin/postulante']);
    }
  } 

  

}
