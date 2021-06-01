import { Component, OnInit } from '@angular/core';
import { Ciudades } from 'src/app/pages/tools/data-lists';
import { Categorias } from 'src/app/pages/tools/data-lists';
import { IndexService } from './index.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: []
})
export class IndexComponent implements OnInit {

  //variables
  CurrentCiudad: any;

  //Variables
  p : number = 1 ;
  CurrentLista:any = [];
  CurrentDetalleLista:any;

 //datalist

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

 Categorias = Categorias.sort(function (a, b) {
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

  constructor(private indexservice:IndexService, 
    private route:Router,
    private tokens:TokenStorageService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  Seleccionarempleo(ciudad:any) {
    this.CurrentCiudad = ciudad;
  }

  empezarBusqueda(): void {
    
    var usuario: any = {
      puestotrabajo: this.busquedaForm.controls['palabraClave'].value,
      ciudad: this.busquedaForm.controls['ciudadUsuario'].value,
      categoria: this.busquedaForm.controls['categoriaUsuario'].value   
    }

    this.tokens.saveTokenBusqueda(usuario);   

    this.indexservice.postBusqueda(usuario.puestotrabajo, usuario.ciudad, usuario.categoria).subscribe(
      data => { 
        console.log(data);
        window.location.href='/home/show/all';
      },      
    );
  }

}
