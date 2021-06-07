import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { NoActiveEmpleoService } from './no-active-empleo.service'

@Component({
  selector: 'app-no-active-empleo',
  templateUrl: './no-active-empleo.component.html',
  styleUrls: []
})
export class NoActiveEmpleoComponent implements OnInit {
  ListNoActive: any;
  ListEmpleoCurrent: any;
  ids: any;

  constructor(private NoActiveEmpleoService:NoActiveEmpleoService,
              private token:TokenStorageService,
              private route: Router) { }

  ngOnInit(): void {
    this.ids = this.token.getUser();
    this.getEmpleoNoActive();
  }

  //get Tabla de empleo no activos con su respectivo API
  getEmpleoNoActive(){
    this.NoActiveEmpleoService.getPublicacionNoActive(this.ids.idReclutador).subscribe(data => {
      this.ListNoActive = data;
    })
  }

  //Seleccionar un empleo de las listas de empleos (lista) -> es el parametro q se tomara del html
  Seleccionarempleo(lista:any) {
    this.ListEmpleoCurrent = lista;
    console.log(this.ListEmpleoCurrent.idPuestoTrabajo);   
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

  BorrarEmpleo(){
    this.NoActiveEmpleoService.deleteEmpleo(this.ListEmpleoCurrent.idPuestoTrabajo).subscribe(data => {
      data;
      console.log(data);
    });
    window.location.reload();
  }


}
