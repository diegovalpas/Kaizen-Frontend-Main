import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../util/token-storage.service';
import { PostulanteSigninService } from './postulante-signin.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostulanteSignin } from './postulante-signin-interface';
declare const $:any;

@Component({
  selector: 'app-postulante-signin',
  templateUrl: './postulante-signin.component.html',
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
`],
})

export class PostulanteSigninComponent implements OnInit {

  loggedPostulante: any;

  errorMessage = '';

  alert: any = {};



  public postulanteSigninForm = this.fb.group({
    
    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])), 

    contraseñaUsuario: new FormControl('', 
    Validators.required)
  });
  userToken: any;

  constructor(private tokenstorageService : TokenStorageService, 
              private postulanteService : PostulanteSigninService, 
              private fb : FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.AlertDefault();
    this.ifLogin();
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

  SigninPostulante() : void{
    var postulante: PostulanteSignin = {

      emailUsuario: this.postulanteSigninForm.controls['emailUsuario'].value,
      contraseñaUsuario: this.postulanteSigninForm.controls['contraseñaUsuario'].value
    }

    this.postulanteService.SignInPostulante(postulante).subscribe(
      data => {

        this.tokenstorageService.saveToken(data.token);
        this.tokenstorageService.saveUser(data);
        $('#start').css('cursor', 'default');
        this.loggedPostulante = this.tokenstorageService.getUser();
        this.router.navigate(['/postulante/' + this.loggedPostulante.idPostulante + '/profile']);
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
