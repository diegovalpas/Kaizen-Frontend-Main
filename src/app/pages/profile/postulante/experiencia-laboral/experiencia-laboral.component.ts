import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { ExperienciaLaboralService} from './experiencia-laboral.service'

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: []
})
export class ExperienciaLaboralComponent implements OnInit {
  ListExp: any;
  mesinicio: any;
  mesfinal: any;
  anioinicio: any;
  anio: any;
  CurrentExperiencia: any;
  postulante: any;

  constructor(private tokenService: TokenStorageService,
              private ExperienciaLaboralService: ExperienciaLaboralService,
              private router: Router,
              private fb: FormBuilder,
              public modal:NgbModal) { }

  ngOnInit(): void {
    this.getExp();
  }

  //Experiencia Modal Form
  public experienciaModalForm = this.fb.group({    
    
    nombreExperienciaLaboral: new FormControl('', 
    Validators.required),
    empresaExperienciaLaboral: new FormControl('', 
    Validators.required),
    mesinicioExperienciaLaboral: new FormControl('', 
    Validators.required),
    anioinicioExperienciaLaboral: new FormControl('', 
    Validators.required),
    mesfinExperienciaLaboral: new FormControl('', 
    Validators.required),
    aniofinExperienciaLaboral: new FormControl('', 
    Validators.required)
  }); 

  //seleccionar experiencia

  Seleccionarexp(exp:any) {
    this.ListExp = exp;
    this.tokenService.saveExp(this.ListExp.idExperienciaLaboral);

    var mesinicioseparador = this.ListExp.periodoinicioExperienciaLaboral
    var mesfinseparador = this.ListExp.periodofinExperienciaLaboral
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
    
      var cadenainicio = this.ListExp.periodoinicioExperienciaLaboral;
      var cadenafin = this.ListExp.periodofinExperienciaLaboral;
      this.anioinicio = cadenainicio.slice(-4);
      this.anio = cadenafin.slice(-4);
    
    console.log(this.ListExp);
  }

  getExp(){
    this.postulante = this.tokenService.getUser();

    this.ExperienciaLaboralService.mostrarExperiencia( this.postulante.idPostulante).subscribe(
      data => {    
        this.CurrentExperiencia= data;
        console.log(data)
      });       
  }

  guardarExp(){ 
   
    var experiencia: any = {
      nombreExperienciaLaboral: this.experienciaModalForm.controls['nombreExperienciaLaboral'].value,
      mesinicioExperienciaLaboral: this.experienciaModalForm.controls['mesinicioExperienciaLaboral'].value,
      anioinicioExperienciaLaboral: this.experienciaModalForm.controls['anioinicioExperienciaLaboral'].value,
      mesfinExperienciaLaboral: this.experienciaModalForm.controls['mesfinExperienciaLaboral'].value,
      aniofinExperienciaLaboral : this.experienciaModalForm.controls['aniofinExperienciaLaboral'].value,
      empresaExperienciaLaboral: this.experienciaModalForm.controls['empresaExperienciaLaboral'].value     
    }
  
    this.ExperienciaLaboralService.guardarExperiencia(this.postulante.idPostulante, experiencia).subscribe(
      data => {    
        data;
        console.log(data);
        window.location.reload();    
      });    
  }

  updateExp(){ 
       
      var experiencia: any = {
        nombreExperienciaLaboral: this.experienciaModalForm.controls['nombreExperienciaLaboral'].value,
        mesinicioExperienciaLaboral: this.experienciaModalForm.controls['mesinicioExperienciaLaboral'].value,
        anioinicioExperienciaLaboral: this.experienciaModalForm.controls['anioinicioExperienciaLaboral'].value,  
        mesfinExperienciaLaboral:  this.experienciaModalForm.controls['mesfinExperienciaLaboral'].value,
        aniofinExperienciaLaboral: this.experienciaModalForm.controls['aniofinExperienciaLaboral'].value,
        empresaExperienciaLaboral: this.experienciaModalForm.controls['empresaExperienciaLaboral'].value    
      }
  
      this.ExperienciaLaboralService.actualizarExperiencia(this.ListExp.idExperienciaLaboral, experiencia).subscribe(
        data => {    
          console.log(data)
          window.location.reload()
        })
    }

  deleteExp(){
    this.ExperienciaLaboralService.borrarExperiencia( this.ListExp.idExperienciaLaboral).subscribe(
      data => {    
        console.log(data);
        window.location.reload();
      });
  }



}
