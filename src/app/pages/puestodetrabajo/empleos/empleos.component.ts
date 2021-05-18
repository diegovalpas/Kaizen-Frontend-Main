import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import {EmpleosService} from './empleos.service';
import {empleoPausa} from 'src/app/pages/signin/postulante/postulante-signin-interface'

@Component({
  selector: 'app-empleos',
  templateUrl: './empleos.component.html',
  styleUrls: []
})


export class EmpleosComponent implements OnInit {

  ids:any;
  ListEmpleo:any = [];
  a: any;
  idpt: any;
  ListCandidatos:any = [];
  ListEmpleopausa: any = [];
  ListEmpleonoactivo: any = [];


  public empleomodalForm = this.fb.group({
    idPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required,
     
    ]))
  });

  constructor(private token:TokenStorageService, private fb:FormBuilder,
              private empleoservice:EmpleosService,private route:Router) { }

  ngOnInit(): void {
    this.ids = this.token.getUser();
    this.getEmpleoActivo();
    this.getEmpleoPaused();
    this.getEmpleoNoActive();
  }

  getEmpleoActivo(){
    
    this.empleoservice.getActivos(this.ids.idReclutador).subscribe(data => {
      this.ListEmpleo = data;
      console.log(this.ListEmpleo);
    })
  }

  getEmpleoPaused(){
   
    this.empleoservice.getPublicacionPaused(this.ids.idReclutador).subscribe(data => {
      this.ListEmpleopausa = data;
      console.log(this.ListEmpleopausa);
    })
  }

  getEmpleoNoActive(){
    
    this.empleoservice.getPublicacionNoActive(this.ids.idReclutador).subscribe(data => {
      this.ListEmpleonoactivo = data;
      console.log(this.ListEmpleonoactivo);
    })
  }

  updatePausaEmpleo(){
    var trabajo:empleoPausa = {
      idPuestoTrabajo: this.empleomodalForm.controls['idPuestoTrabajo'].value
    }
    this.idpt = this.token.getTokenjob()
    this.empleoservice.putPublicacionpausa(trabajo).subscribe(data => {
      data
      console.log(data);
    });
  }

  saveEmpleotokenpausa(){
    this.idpt = this.ListEmpleo.idPuestoTrabajo
    this.token.saveTokenjob(this.idpt);
  }

  saveEmpleobyPostulante(){

    this.idpt = this.ListEmpleo.idPuestoTrabajo
    this.token.saveTokenjob(this.idpt);
    this.route.navigate(['/listacandidatos']);
  }

  Seleccionarempleo(lista:any) {
    this.ListEmpleo = lista;
  }

  verDetalle(){
    this.token.saveTokenjob(this.ListEmpleo.idPuestoTrabajo);
    this.route.navigate(['puestotrabajo/'+this.ListEmpleo.idPuestoTrabajo+'/detail']);
  }

}
