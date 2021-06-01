import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { EstudiosService} from './estudios.service'


@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: []
})
export class EstudiosComponent implements OnInit {
  ListEdu: any;
  mesinicio: any;
  mesfinal: any;
  anioinicio: any;
  anio: any;
  CurrentEducacion: any;
  id: any;
  postulante: any;

  constructor(private tokenService: TokenStorageService,
              private router: Router,
              private fb: FormBuilder,
              public modal:NgbModal,
              private EstudiosService: EstudiosService) { }

  ngOnInit(): void {
    this.getEdu();
  }

  public educacionModalForm = this.fb.group({    
    
    nombreEducacion: new FormControl('', 
    Validators.required),
    institucionEducacion: new FormControl('', 
    Validators.required),
    mesinicioEducacion: new FormControl('', 
    Validators.required),
    anioinicioEducacion: new FormControl('', 
    Validators.required),
    mesfinEducacion: new FormControl('', 
    Validators.required),
    aniofinEducacion: new FormControl('', 
    Validators.required)
  }); 
  
  //seleccionar educacion
  SeleccionarEdu(edu:any) {
    this.ListEdu = edu;
    this.tokenService.saveEdu(this.ListEdu.idEducacion);

    var mesinicioseparador = this.ListEdu.periodoinicioEducacion
    var mesfinseparador = this.ListEdu.periodofinEducacion
    this.mesinicio = mesinicioseparador.slice(0,-5)
    this.mesfinal = mesfinseparador.slice(0,-5)

    switch (this.mesinicio) 
        {
            case 'Enero':  this.mesinicio = "01";
                     break;
            case 'Febrero':  this.mesinicio = "02";
                     break;
            case 'Marzo':  this.mesinicio = "03";
                     break;
            case 'Abril':  this.mesinicio = "04";
                     break;
            case 'Mayo':  this.mesinicio = "05";
                     break;
            case 'Junio':  this.mesinicio = "06";
                     break;
            case 'Julio':  this.mesinicio = "07";
                     break;                  
            case 'Agosto':  this.mesinicio = "08";
                     break;
            case 'Septiembre':  this.mesinicio = "09";
                     break;
            case 'Octubre':  this.mesinicio = "10";
                     break;
            case 'Noviembre':  this.mesinicio = "11";
                     break;
            case 'Diciembre':  this.mesinicio = "12";
                     break;            
        }
        switch (this.mesfinal) 
        {
            case 'Enero':  this.mesfinal = "01";
                     break;
            case 'Febrero':  this.mesfinal = "02";
                     break;
            case 'Marzo':  this.mesfinal = "03";
                     break;
            case 'Abril':  this.mesfinal = "04";
                     break;
            case 'Mayo':  this.mesfinal = "05";
                     break;
            case 'Junio':  this.mesfinal = "06";
                     break;
            case 'Julio':  this.mesfinal = "07";
                     break;                  
            case 'Agosto':  this.mesfinal = "08";
                     break;
            case 'Septiembre':  this.mesfinal = "09";
                     break;
            case 'Octubre':  this.mesfinal = "10";
                     break;
            case 'Noviembre':  this.mesfinal = "11";
                     break;
            case 'Diciembre':  this.mesfinal = "12";
                     break;            
        }  
    
      var cadenainicio = this.ListEdu.periodoinicioEducacion;
      var cadenafin = this.ListEdu.periodofinEducacion;
      this.anioinicio = cadenainicio.slice(-4);
      this.anio = cadenafin.slice(-4);

    console.log(this.ListEdu);
  }
  //obtener educacion

  

  getEdu(){
    this.postulante = this.tokenService.getUser();
    
    this.EstudiosService.mostrarEducacion(this.postulante.idPostulante).subscribe(
      data => {    
        this.CurrentEducacion= data;  
        console.log(data)
      });
  }

  //agregar educacion

  guardarEdu(){ 

    var educacion: any = {
    nombreEducacion: this.educacionModalForm.controls['nombreEducacion'].value,
    mesinicioEducacion:this.educacionModalForm.controls['mesinicioEducacion'].value,
    anioinicioEducacion:this.educacionModalForm.controls['anioinicioEducacion'].value,
    mesfinEducacion:this.educacionModalForm.controls['mesfinEducacion'].value,
    aniofinEducacion:this.educacionModalForm.controls['aniofinEducacion'].value,
    institucionEducacion: this.educacionModalForm.controls['institucionEducacion'].value     
    }
  
    this.EstudiosService.guardarEducacion(this.postulante.idPostulante, educacion).subscribe(
      data => {     
      this.CurrentEducacion = data;
      console.log(data);
      window.location.reload();
    });    
  }

  //editar educacion

  editaEdu(){
    var educacion: any = {
      nombreEducacion: this.educacionModalForm.controls['nombreEducacion'].value,
      mesinicioEducacion: this.educacionModalForm.controls['mesinicioEducacion'].value,
      anioinicioEducacion: this.educacionModalForm.controls['anioinicioEducacion'].value,
      mesfinEducacion: this.educacionModalForm.controls['mesfinEducacion'].value,
      aniofinEducacion : this.educacionModalForm.controls['aniofinEducacion'].value,
      institucionEducacion: this.educacionModalForm.controls['institucionEducacion'].value     
    }
    this.EstudiosService.actualizarEducacion(this.ListEdu.idEducacion, educacion).subscribe(
    data => {
      console.log(data);
      window.location.reload(); 
    })
  }

  deleteEdu(){   
    this.EstudiosService.borrarEducacion( this.ListEdu.idEducacion).subscribe(
      data => {    
        console.log(data);
        window.location.reload();
      });
  }

  
}
