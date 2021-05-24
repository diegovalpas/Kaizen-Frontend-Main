import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { ReclutadorSigninRequest } from './reclutador-signin-interface';
import { ReclutadorSigninService } from './reclutador-signin.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-reclutador-signin',
  templateUrl: './reclutador-signin.component.html',
  styles: []
})

export class ReclutadorSigninComponent implements OnInit {
  
  //Variables
  currentUser:any;
  isLoggedIn:any;
  auxUsertoken: any;
  
  //Validaciones para el HTML
  public reclutadorloginForm = this.fb.group({     
    
    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),        
  
    //Regex 
    contraseñaUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern("")
    ]))   
  });
  
  constructor(private tokenstorageservice:TokenStorageService
                ,private Reclutador:ReclutadorSigninService
                ,private fb: FormBuilder
                ,private router:Router) {
   }

  ngOnInit(): void {
    this.VerificarSesion();
  }

  VerificarSesion(): void {
    if(this.tokenstorageservice.getUser()){
      this.auxUsertoken = this.tokenstorageservice.getUser()
      if(this.auxUsertoken.idPostulante !== undefined){
        this.router.navigate(['login/postulante/'+this.auxUsertoken.idPostulante+'/profile/basicinfo']);
      }
      if(this.auxUsertoken.idReclutador !== undefined){
        this.router.navigate(['login/reclutador/'+this.auxUsertoken.idReclutador+'/profile/basicinfo']);
      }      
    }else{
    }
  }
  
  IngresoLoginR(): void {
    
    var usuario: ReclutadorSigninRequest = {
      emailUsuario: this.reclutadorloginForm.controls['emailUsuario'].value,
      contraseñaUsuario: this.reclutadorloginForm.controls['contraseñaUsuario'].value
    }

    this.Reclutador.SignInReclutador(usuario).subscribe(
      data => {
        this.tokenstorageservice.saveToken(data.token);
        this.tokenstorageservice.saveUser(data);
        this.currentUser = this.tokenstorageservice.getUser();
        this.router.navigate(['/login/reclutador/'+ this.currentUser.idReclutador +'/profile/basicinfo'])
        console.log(data);
    });
  }
}

