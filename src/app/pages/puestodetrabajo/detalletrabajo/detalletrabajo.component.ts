import { Component, OnInit, Input } from '@angular/core';
import {DetalletrabajoService} from './detalletrabajo.service';
import {TokenStorageService} from 'src/app/util/token-storage.service';
import {Router} from '@angular/router';
import {PostulacionService} from 'src/app/pages/puestodetrabajo/postulacion/postulacion.service'
import { FormBuilder,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalletrabajo',
  templateUrl: './detalletrabajo.component.html',
  styleUrls: []
})
export class DetalletrabajoComponent implements OnInit {
  isButtonVisible = false;
  PostulanteActual:any ;
  currentDetalleLista:any = [];
  auxUsertoken: any;

  constructor(private detalle:DetalletrabajoService, private tokens:TokenStorageService, private route:Router,
              private postulacionservice:PostulacionService, private fb:FormBuilder) { }

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
    
    this.detalle.getdetalleLista(this.tokens.getTokenjob()).subscribe(
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
            this.postulacionservice.PostularTrabajoenDetalle(this.PostulanteActual.idPostulante,this.currentDetalleLista.idPuestoTrabajo).subscribe(
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
