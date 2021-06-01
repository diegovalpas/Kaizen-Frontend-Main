import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { ListaTrabajosService} from './lista-trabajos.service';
import { Router } from '@angular/router';
import { Ciudades, Categorias, Experiencia, PeriodoPublicacion } from '../tools/data-lists';

@Component({
  selector: 'app-lista-trabajos',
  templateUrl: './lista-trabajos.component.html',
  styleUrls: []
})
export class ListaTrabajosComponent implements OnInit {

  //Variables
  selectedExperience:any = '';
  selectedFecha:any = '';
  CurrentDatos: any = [];
  CurrentEmpleo : any;
  p : number =1 ;
  CurrentDetalleLista: any;

  //Datalist
  Categorias = Categorias;
  Experiencias = Experiencia;
  PeriodoPublicaciones = PeriodoPublicacion;

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

  public BusquedaParametros = this.fb.group({
    palabraClave: new FormControl('', 
    Validators.required),

    ciudadUsuario: new FormControl('', 
    Validators.required),

    categoriaUsuario: new FormControl('', 
    Validators.required)
  })

  constructor(private listatrabajosservice: ListaTrabajosService,
    private fb: FormBuilder,
    private tokens: TokenStorageService, private route: Router) { }

  ngOnInit(): void {
    this.verListaDeTrabajos();
  }

  getDatos() : void{
    if(this.tokens.getTokenBusqueda() != null){
     this.CurrentDatos = this.tokens.getTokenBusqueda();  
    }else{
      this.CurrentDatos.puestotrabajo = '';
      this.CurrentDatos.ciudad = '';
      this.CurrentDatos.categoria = ''; 
    }
 }

 RBfechaChange (event:any){
   this.selectedFecha = event.target.value;
 }

 RBexperienceChange (event:any){
   this.selectedExperience = event.target.value;
 }

 verListaDeTrabajos(){
   this.getDatos();
   if(this.tokens.getTokenBusqueda() != null){
     this.listatrabajosservice.BusquedaListaParametros(this.CurrentDatos.puestotrabajo,this.CurrentDatos.ciudad,this.CurrentDatos.categoria,"","").subscribe(
       data => {
         this.CurrentEmpleo = data;   
         console.log(this.CurrentEmpleo);  
     })
   }else 
     this.listatrabajosservice.ListaDeTrabajos().subscribe(
       data => {
         this.CurrentEmpleo = data;   
         console.log(this.CurrentEmpleo);
   })
 }

 BusquedaPorParametros() {

   var user: any = {
     palabraClave: this.BusquedaParametros.controls['palabraClave'].value,
     ciudadUsuario: this.BusquedaParametros.controls['ciudadUsuario'].value,
     categoriaUsuario: this.BusquedaParametros.controls['categoriaUsuario'].value 
   }

   if(user.palabraClave !== '' || user.ciudadUsuario !== '' || user.categoriaUsuario !== '' || this.selectedFecha !== '' || this.selectedExperience !== ''){
     this.listatrabajosservice.BusquedaListaParametros(user.palabraClave,
       user.ciudadUsuario,
       user.categoriaUsuario,
       this.selectedFecha,
       this.selectedExperience).subscribe(
        data => {
           this.CurrentEmpleo = data;   
       })
   } else {
     this.verListaDeTrabajos();
   }
   this.tokens.deleteTokenBusqueda();
 }

 Seleccionarempleo(empleo:any) {
   this.CurrentDetalleLista = empleo;
 }

 verDetalle(){
   this.tokens.saveTokenjob(this.CurrentDetalleLista.idPuestoTrabajo);
   this.route.navigate(['puestotrabajo/'+this.CurrentDetalleLista.idPuestoTrabajo+'/detail']);
 }

 EliminarFiltros(){
   window.location.reload();
 }

}
