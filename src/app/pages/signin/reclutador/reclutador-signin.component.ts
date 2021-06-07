import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../util/token-storage.service';
import { ReclutadorSigninService } from './reclutador-signin.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReclutadorSignin } from './reclutador-signin-interface';
declare const $:any;

@Component({
  selector: 'app-reclutador-signin',
  templateUrl: './reclutador-signin.component.html',
  styles: [`
  .alert-default {
    color: transparent;
    background-color: transparent;
    border-color: transparent;
    margin-top: -20px;
  
  }

  .alert-invalid {
    color: #ffffff;
    background-color: #dc3545;
    border-color: #dc3545;
    text-align: center;
    margin-top: 20px;
  }
`]
})
export class ReclutadorSigninComponent implements OnInit {

  loggedReclutador: any;

  public reclutadorSigninForm = this.fb.group({
    
    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])), 

    contraseñaUsuario: new FormControl('', 
    Validators.required)
  });
  userToken: any;
  alert: any = {};
  constructor(private tokenstorageService : TokenStorageService, 
              private reclutadorService : ReclutadorSigninService, 
              private fb : FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.ifLogin();
    this.AlertDefault();
  }

  LoadPage(){
    $('#start').css('cursor', 'wait');
  }

  ifLogin(){

    if(this.tokenstorageService.getUser()){
      this.userToken = this.tokenstorageService.getUser()
      if(this.userToken.idReclutador !== undefined){       
        this.router.navigate(['/reclutador/' + this.userToken.idReclutador + '/profile']);
      }
      if(this.userToken.idPostulante !== undefined){
        this.router.navigate(['/postulante/' + this.userToken.idPostulante + '/profile']);
      }
    }
    if(this.tokenstorageService.getToken() === null){
    }
  }

  AlertDefault() {
    this.alert.type = 'default';
  }

  SigninReclutador() : void{
    var reclutador: ReclutadorSignin = {

      emailUsuario: this.reclutadorSigninForm.controls['emailUsuario'].value,
      contraseñaUsuario: this.reclutadorSigninForm.controls['contraseñaUsuario'].value
    }

    this.reclutadorService.SignInReclutador(reclutador).subscribe(
      data => {
        this.tokenstorageService.saveToken(data.token);
        this.tokenstorageService.saveUser(data);
        $('#start').css('cursor', 'default');
        this.loggedReclutador = this.tokenstorageService.getUser();
        this.router.navigate(['/reclutador/' + this.loggedReclutador.idReclutador + '/profile']);
      },
      err => {
        $('#start').css('cursor', 'default');
        console.log(err);
        this.alert.type = 'invalid';  
        this.alert.message = 'Email o Contraseña incorrecta';
      }
    )
  }
}
