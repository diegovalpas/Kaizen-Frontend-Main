import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { ListaTrabajosService} from './lista-trabajos.service';
import { Ciudades, Categorias, Experiencia, PeriodoPublicacion } from '../../../util/data-lists';

@Component({
  selector: 'app-lista-trabajos',
  templateUrl: './lista-trabajos.component.html',
  styleUrls: []
})

export class ListaTrabajosComponent implements OnInit {

  //Asignamos
  selectedExperience:any = '';
  selectedFecha:any = '';

  CurrentDatos: any = [];
  CurrentEmpleo : any;
  p : number =1 ;

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

   //variables de Local Storage
   


  constructor( private listatrabajosservice: ListaTrabajosService,
               private fb: FormBuilder,
               private tokens: TokenStorageService) { }

  ngOnInit(): void {
    this.verListaDeTrabajos();
  }

  //Usamos los datos del local para el html
  getDatos() : void{
     if(this.tokens.getTokenBusqueda() != null){
      this.CurrentDatos = this.tokens.getTokenBusqueda();  
      console.log(this.CurrentDatos);
     }else{
       this.CurrentDatos.puestotrabajo = '';
       this.CurrentDatos.ciudad = '';
       this.CurrentDatos.categoria = ''; 
     }
  }

  RBfechaChange (event:any){
    this.selectedFecha = event.target.value;
    console.log(this.selectedFecha);
  }

  RBexperienceChange (event:any){
    this.selectedExperience = event.target.value;
    console.log(this.selectedExperience);
  }

  verListaDeTrabajos(){
    this.getDatos();
    if(this.tokens.getTokenBusqueda() != null){
      this.listatrabajosservice.BusquedaListaParametros(this.CurrentDatos.puestotrabajo,this.CurrentDatos.ciudad,this.CurrentDatos.categoria,"","").subscribe(
        data => {
          this.CurrentEmpleo = data;   
          console.log(this.CurrentEmpleo);  
      });
    } else 
      this.listatrabajosservice.ListaDeTrabajos().subscribe(
        data => {
          this.CurrentEmpleo = data;   
          console.log(this.CurrentEmpleo);
        });  
    
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
            console.log(this.CurrentEmpleo);  
        });
      
    } else {
      this.verListaDeTrabajos();
      
    }
    this.tokens.deleteTokenBusqueda();
  }

  EliminarFiltros(){
    window.location.reload();
  }
}
