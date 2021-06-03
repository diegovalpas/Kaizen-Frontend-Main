import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../util/token-storage.service';
import { PostulanteSigninService } from './postulante-signin.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostulanteSignin } from './postulante-signin-interface';

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

  //variables
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

  constructor(private tokenstorageService : TokenStorageService, 
              private postulanteService : PostulanteSigninService, 
              private fb : FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.AlertDefault();
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
        this.loggedPostulante = this.tokenstorageService.getUser();
        this.router.navigate(['/postulante/' + this.loggedPostulante.idPostulante + '/profile']);
      },

      err => {
        console.log(err);
        this.alert.type = 'invalid';  
        this.alert.message = 'Email o Contraseña incorrecta';
      }
    )
  }
}
