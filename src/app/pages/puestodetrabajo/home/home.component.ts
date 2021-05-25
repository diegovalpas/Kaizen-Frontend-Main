import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import {Router} from '@angular/router';
import {TokenStorageService} from 'src/app/util/token-storage.service';
import { Ciudades, Categorias } from '../../../util/data-lists';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  
  //Variables
  p : number = 1 ;
  CurrentLista:any = [];
  CurrentDetalleLista:any;

  //Datalist
  Categorias = Categorias;
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

  //Form que conecta el HTML
  public busquedaForm = this.fb.group({

    ciudadUsuario: new FormControl('', 
    Validators.required),

    categoriaUsuario: new FormControl('', 
    Validators.required),

    palabraClave: new FormControl('', 
    Validators.required)
  
  })

  constructor(private homeservice:HomeService, 
              private route:Router,
              private tokens:TokenStorageService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getListaempleos();
  }
    
  getListaempleos(){
    
    this.homeservice.getListaparams().subscribe(
    data => {
      this.CurrentLista = data;
      console.log(this.CurrentLista);
    },
    error => {
      console.log(error);
    });
  }

  getListaempleospart(){
    
    this.homeservice.getListaparamspart().subscribe(
    data => {
      this.CurrentLista = data;
      console.log(this.CurrentLista);
    },
    error => {
      console.log(error);
    });
  }

  getListaempleosfull(){
    
    this.homeservice.getListaparamsfull().subscribe(
    data => {
      this.CurrentLista = data;
      console.log(this.CurrentLista);
    },
    error => {
      console.log(error);
    });
  }

  Seleccionarempleo(empleo:any) {
    this.CurrentDetalleLista = empleo;
    console.log(this.CurrentDetalleLista)
  }

  verDetalle(){
    this.tokens.saveTokenjob(this.CurrentDetalleLista.idPuestoTrabajo);
    this.route.navigate(['puestotrabajo/'+this.CurrentDetalleLista.idPuestoTrabajo+'/detail']);
  }

  empezarBusqueda(): void {

    var usuario: any = {
      puestotrabajo: this.busquedaForm.controls['palabraClave'].value,
      ciudad: this.busquedaForm.controls['ciudadUsuario'].value,
      categoria: this.busquedaForm.controls['categoriaUsuario'].value   
    }
    this.tokens.saveTokenBusqueda(usuario);   


    this.homeservice.postBusqueda(usuario.puestotrabajo, usuario.ciudad, usuario.categoria).subscribe(
      data => { 
        console.log(data);
        this.route.navigate(['postulante/home/show/all']);
      },      
    );
  }
}



