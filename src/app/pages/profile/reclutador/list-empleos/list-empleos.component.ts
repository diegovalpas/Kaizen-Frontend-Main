import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {ReclutadorProfileService} from '..//reclutador-profile.service';
import {idempleo} from '../reclutador-profile-interface';
import { Categorias,TipoPostulacion,Experiencia,Publicacion,Remoto,Ciudades } from '../../../tools/data-lists';

@Component({
  selector: 'app-list-empleos',
  templateUrl: './list-empleos.component.html',
  styleUrls: []
})
export class ListEmpleosComponent implements OnInit {

  //id del reclutador
  ids:any;

  //lista de empleos activos
  ListActive:any = [];
  ListPaused: any = [];
  ListNoActive: any = [];

  //Seleccion de un objeto en la lista
  ListEmpleoCurrent: any = {};
  
  //lista de candidatos del trabajo seleccionado
  ListCandidatos:any = [];

  //Datalist
  Categorias = Categorias;
  TipoPostulacion =TipoPostulacion;
  Experiencia = Experiencia;
  Publicacion = Publicacion;
  Remoto = Remoto;

  Ciudades = Ciudades.sort(function (a, b) {
    if (a.text > b.text) {
      return 1;
    }

    if(a.text < b.text) {
      return -1;
    }

    else {
      return 0;
    }
  })

  public puestostrabajoform = this.fb.group({     
    
    nombrePuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    ciudadPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    categoriaPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    trabajoremotoPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])),        
    tipojornadaPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    sueldoPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    experienciaPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    descripcionPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])),
    periodopublicacionPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ]))
  })

  constructor(private token:TokenStorageService, private fb:FormBuilder,
              private reclutadorservice:ReclutadorProfileService,private route:Router) { }

  ngOnInit(): void {
    this.ids = this.token.getUser();
    this.getEmpleoActivo();
    this.getEmpleoPaused();
    this.getEmpleoNoActive();
  }

   //get Tabla de empleo activos con su respectivo API
   getEmpleoActivo(){
    this.reclutadorservice.getActivos(this.ids.idReclutador).subscribe(data => {
      this.ListActive = data;
      console.log(this.ListActive);
    })
  }

  //get Tabla de empleo pausados con su respectivo API
  getEmpleoPaused(){
    this.reclutadorservice.getPublicacionPaused(this.ids.idReclutador).subscribe(data => {
      this.ListPaused = data;
      console.log(this.ListPaused);
    })
  }

  //get Tabla de empleo no activos con su respectivo API
  getEmpleoNoActive(){
    this.reclutadorservice.getPublicacionNoActive(this.ids.idReclutador).subscribe(data => {
      this.ListNoActive = data;
      console.log(this.ListNoActive);
    })
  }

  //Seleccionar un empleo de las listas de empleos (lista) -> es el parametro q se tomara del html
  Seleccionarempleo(lista:any) {
    this.ListEmpleoCurrent = lista;
    console.log(this.ListEmpleoCurrent);
  }

  //Ir a publicacion del trabajo
  verDetalle(){
    this.token.saveTokenjob(this.ListEmpleoCurrent.idPuestoTrabajo);
    this.route.navigate(['puestotrabajo/'+this.ListEmpleoCurrent.idPuestoTrabajo+'/detail']);
  }

  //guardar el token para ver la lista de canditatos
  verPostulantes(){
    this.token.saveTokenjob(this.ListEmpleoCurrent.idPuestoTrabajo);
    this.route.navigate(['/candidatos']);
  }

  //Pausar un empleo seleccionado
  PausaEmpleo(){
    var trabajo:idempleo = {
      idPuestoTrabajo: this.ListEmpleoCurrent.idPuestoTrabajo
    }
    this.reclutadorservice.putPublicacionpausa(trabajo).subscribe(data => {
      data;
      console.log(data);
      window.location.reload();
    });
  }

  //Reanudar empleo seleccionado
  ActivarEmpleo(){
    var trabajo:idempleo = {
      idPuestoTrabajo: this.ListEmpleoCurrent.idPuestoTrabajo
    }
    this.reclutadorservice.putPublicacionactivar(trabajo.idPuestoTrabajo).subscribe(data => {
      data;
      console.log(data);
    });
    window.location.reload();
  }

  ActualizarEmpleo(): void {
    var puestowork: any = {
      nombrePuestoTrabajo: this.puestostrabajoform.controls['nombrePuestoTrabajo'].value,
      ciudadPuestoTrabajo: this.puestostrabajoform.controls['ciudadPuestoTrabajo'].value,
      categoriaPuestoTrabajo: this.puestostrabajoform.controls['categoriaPuestoTrabajo'].value,
      trabajoremotoPuestoTrabajo: this.puestostrabajoform.controls['trabajoremotoPuestoTrabajo'].value,
      tipojornadaPuestoTrabajo: this.puestostrabajoform.controls['tipojornadaPuestoTrabajo'].value,
      sueldoPuestoTrabajo: this.puestostrabajoform.controls['sueldoPuestoTrabajo'].value,
      experienciaPuestoTrabajo: this.puestostrabajoform.controls['experienciaPuestoTrabajo'].value,
      descripcionPuestoTrabajo: this.puestostrabajoform.controls['descripcionPuestoTrabajo'].value,
      periodopublicacionPuestoTrabajo: this.puestostrabajoform.controls['periodopublicacionPuestoTrabajo'].value
    }

    this.reclutadorservice.putPublicacionUpdate(puestowork,this.ids.idReclutador, this.ListEmpleoCurrent.idPuestoTrabajo).subscribe(
      data => {
        console.log(data);
    });
  }

  BorrarEmpleo(){
    this.reclutadorservice.deleteEmpleo(this.ListEmpleoCurrent.idPuestoTrabajo).subscribe(data => {
      data;
      console.log(data);
    });
    window.location.reload();
  }

}
