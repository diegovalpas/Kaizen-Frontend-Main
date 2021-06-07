import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias, Ciudades, Experiencia, Publicacion, Remoto, TipoPostulacion } from 'src/app/pages/tools/data-lists';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { ActiveEmpleoService } from './active-empleo.service'

@Component({
  selector: 'app-active-empleo',
  templateUrl: './active-empleo.component.html',
  styleUrls: []
})
export class ActiveEmpleoComponent implements OnInit {
  ListActive: any;
  ids: any;
  ListEmpleoCurrent: any;
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

  constructor(private ActiveEmpleoService:ActiveEmpleoService,
              private token:TokenStorageService,
              private route:Router,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this.ids = this.token.getUser();  
    this.getEmpleoActivo();
  }

  //get Tabla de empleo activos con su respectivo API
  getEmpleoActivo(){
    this.ActiveEmpleoService.getActivos(this.ids.idReclutador).subscribe(data => {
      this.ListActive = data;
      console.log(this.ListActive);
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
    this.route.navigate(['/listacandidatos']);
  }

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

  //Pausar un empleo seleccionado
  PausaEmpleo(){
    var trabajo:any = {
      idPuestoTrabajo: this.ListEmpleoCurrent.idPuestoTrabajo
    }
    this.ActiveEmpleoService.putPublicacionpausa(trabajo).subscribe(data => {
      data;
      console.log(data);
      window.location.reload();
    });
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

    this.ActiveEmpleoService.putPublicacionUpdate(puestowork,this.ids.idReclutador, this.ListEmpleoCurrent.idPuestoTrabajo).subscribe(
      data => {
        console.log(data);
    });
  }

  BorrarEmpleo(){
    this.ActiveEmpleoService.deleteEmpleo(this.ListEmpleoCurrent.idPuestoTrabajo).subscribe(data => {
      data;
      console.log(data);
    });
    window.location.reload();
  }


}
