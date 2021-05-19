import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import { ReclutadorBasicInfoResponse } from 'src/app/pages/signin/reclutador/reclutador-signin-interface'
import { ReclutadorService} from './reclutador.service'
import { ReclutadorUpdate } from './reclutador-interface';
import { NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {EmpleosComponent} from 'src/app/pages/puestodetrabajo/empleos/empleos.component'


@Component({
  selector: 'app-reclutador',
  templateUrl: './reclutador.component.html',
  styleUrls: ['./reclutador.component.css']
})
export class ReclutadorComponent implements OnInit {

    CurrentUserparam:any = [];
    Usuario:any = {
    

  };
  
  CurrentUser:any;
  CurrentUser2:any;
  CurrentUser3:any;
  idReclutador:any;
  isLoginFailed = false;
  signupSuccess = false;
  errorMessage = '';
  TamanioEmpresaReclutador: any;

  auxnombreReclutador: any = '';

  selectedlogo: any;
  currentLogo?: File;


  constructor( private tokens:TokenStorageService,
    private fb:FormBuilder,
     private router:Router,
     private ReclutadorService:ReclutadorService,
     private route:ActivatedRoute,
     public modal:NgbModal) { }

  ngOnInit(): void {

    this.autenticacion();   

  }

  getUserparam(){
    this.CurrentUser = this.tokens.getUser(); 
    
    var link = this.router.navigate(['/login/reclutador/'+this.CurrentUser.idReclutador+'/profile/basicinfo']);

    if( link!= link){
      this.router.navigate(['/signup/reclutador']);
    }else{
      
      this.idReclutador = this.CurrentUser.idReclutador;

      this.ReclutadorService.get(this.CurrentUser.idReclutador).subscribe(
      data => {
        this.CurrentUserparam = data,
        
        this.Usuario.nombreReclutador = this.CurrentUserparam.nombreReclutador,
        this.Usuario.ciudadReclutador = this.CurrentUserparam.ciudadReclutador,
        this.Usuario.nombrecontactanteReclutador = this.CurrentUserparam.nombrecontactanteReclutador,
        this.Usuario.descripcionReclutador = this.CurrentUserparam.descripcionReclutador, 
        this.Usuario.direccionReclutador = this.CurrentUserparam.direccionReclutador,
        this.Usuario.telefonoReclutador = this.CurrentUserparam.telefonoReclutador,
        this.Usuario.tituloReclutador = this.CurrentUserparam.tituloReclutador
        
        this.Usuario.logoempresaReclutador = this.CurrentUserparam.logoempresaReclutador.urlImagen,
        console.log(this.Usuario);
      },

      error => {
        console.log(error);
      });
    }
  }

  public reclutadorModalForm = this.fb.group({
    nombreUsuario: new FormControl('', Validators.compose([
      Validators.required,
     
    ])),
  
    ciudadUsuario: new FormControl('', 
    Validators.required),    
    
    nombrecontactanteUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)")
    ])),
  
    tamanioempresaUsuario: new FormControl('', 
    ), 
    
    telefonoUsuario: new FormControl('', 
    Validators.required), 
  
    direccionUsuario: new FormControl('', 
    ), 
  
    descripcionUsuario: new FormControl('', 
    Validators.required), 
  
    tituloUsuario: new FormControl('', 
    ), 
    logo: new FormControl(null),
  
  });

  updateUserparam(): any{
    var usuario: ReclutadorUpdate = {
      nombreUsuario: this.reclutadorModalForm.controls['nombreUsuario'].value,
      ciudadUsuario: this.reclutadorModalForm.controls['ciudadUsuario'].value,
      nombrecontactanteUsuario: this.reclutadorModalForm.controls['nombrecontactanteUsuario'].value,
      tamañoempresaUsuario: this.reclutadorModalForm.controls['tamanioempresaUsuario'].value,
      telefonoUsuario: this.reclutadorModalForm.controls['telefonoUsuario'].value,
      direccionUsuario: this.reclutadorModalForm.controls['direccionUsuario'].value,
      descripcionUsuario: this.reclutadorModalForm.controls['descripcionUsuario'].value,
      tituloUsuario: this.reclutadorModalForm.controls['tituloUsuario'].value,
      }

      

      this.ReclutadorService.update(usuario, this.CurrentUser.idReclutador).subscribe(
        data => {         
          this.CurrentUserparam = data;
          this.CurrentUserparam.nombreReclutador = usuario.nombreUsuario;
          this.CurrentUserparam.ciudadReclutador = usuario.ciudadUsuario;
          this.CurrentUserparam.nombrecontactanteReclutador = usuario.nombrecontactanteUsuario;
          this.CurrentUserparam.tamañoempresaReclutador = usuario.tamañoempresaUsuario;
          this.CurrentUserparam.telefonoReclutador = usuario.telefonoUsuario;
          this.CurrentUserparam.direccionReclutador = usuario.direccionUsuario;
          this.CurrentUserparam.descripcionUsuario = usuario.descripcionUsuario;
          this.CurrentUserparam.tituloUsuario = usuario.tituloUsuario;
          this.signupSuccess = true;
          console.log(this.CurrentUserparam);
          window.location.reload();
          
        } 
      );
  }

  seleccionarLogo(event: any): void {
    this.selectedlogo = event.target.files;
  }

  subirLogo(): any {
    if (this.selectedlogo) {
      const logo: File | null = this.selectedlogo.item(0);
      if (logo) {
        this.currentLogo = logo;
      }
      return this.currentLogo;
    }
  }

  UpdateLogoempresa(){
    
    this.ReclutadorService.updateLogo(this.subirLogo(),this.CurrentUser.idReclutador).subscribe(
      data => { 
        this.CurrentUser2 = data;
        this.CurrentUser2.logoempresaReclutador = this.currentLogo;
        this.signupSuccess = true; 
        window.location.reload();
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.signupSuccess = false;
      }
    );
  }
  
  autenticacion(){

    if(this.tokens.getToken()){
      this.getUserparam();
      this.isLoginFailed = true;
      
    }else{
      this.Salir();
    } 
  }
  
  Salir(){
    this.tokens.signOut();
    this.router.navigate(['/signin/reclutador'])
  }

}



  




  


