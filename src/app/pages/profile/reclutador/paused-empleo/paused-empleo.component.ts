import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { PausedEmpleoService } from './paused-empleo.service';


@Component({
  selector: 'app-paused-empleo',
  templateUrl: './paused-empleo.component.html',
  styleUrls: []
})
export class PausedEmpleoComponent implements OnInit {
  ListPaused: any;
  ids: any;
  ListEmpleoCurrent: any;

  constructor(private PausedEmpleoService:PausedEmpleoService,
              private token: TokenStorageService,
              private route:Router) { }

  ngOnInit(): void {
    this.ids = this.token.getUser();
    this.getEmpleoPaused();
  }

  //get Tabla de empleo pausados con su respectivo API
  getEmpleoPaused(){
    this.PausedEmpleoService.getPublicacionPaused(this.ids.idReclutador).subscribe(data => {
      this.ListPaused = data;
      console.log(this.ListPaused);
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

  
  //Reanudar empleo seleccionado
  ActivarEmpleo(){
    var trabajo:any = {
      idPuestoTrabajo: this.ListEmpleoCurrent.idPuestoTrabajo
    }
    this.PausedEmpleoService.putPublicacionactivar(trabajo.idPuestoTrabajo).subscribe(data => {
      data;
      console.log(data);
    });
    window.location.reload();
  }

}
