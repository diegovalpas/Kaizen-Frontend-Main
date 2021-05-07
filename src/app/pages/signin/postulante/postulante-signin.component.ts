import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService} from 'src/app/util/token-storage.service';
import { PostulanteSigninService } from './postulante-signin.service';
import { PostulanteSigninRequest, PostulanteSigninResponse } from './postulante-signin-interface';
import {Router} from '@angular/router'

@Component({
  selector: 'app-postulante-signin',
  templateUrl: './postulante-signin.component.html',
  styles: []
})

export class PostulanteSigninComponent implements OnInit {
  currentUser:any;
  auxUsertoken:any;
  auxusuarioid:any;
  isLoggedIn:any;
  link: any;

  public postulanteloginForm = this.fb.group({     
    
    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),        
  
    //TODO: Regex Contraseña 
    contraseñaUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern("")
    ]))   
  
  });

  isLoginFailed = false;

  constructor(private tokenstorageservice:TokenStorageService
                ,private Postulante:PostulanteSigninService
                ,private fb: FormBuilder
                ,private router:Router) {
   }
   

  ngOnInit(): void {
    /*
    if(this.tokenstorageservice.getUser()){
      this.auxUsertoken = this.tokenstorageservice.getUser()
      if(this.auxUsertoken.idReclutador !== ''){
        this.tokenstorageservice.signOut();
      }
      if(this.auxUsertoken.idPostulante !== ''){
        this.router.navigate(['login/postulante/'+this.auxUsertoken.idPostulante+'/profile/basicinfo']);
      }
    }else{
    }*/
  }
  
  IngresoLogin(): void {
    
    var usuario: PostulanteSigninRequest = {
      emailUsuario: this.postulanteloginForm.controls['emailUsuario'].value,
      contraseñaUsuario: this.postulanteloginForm.controls['contraseñaUsuario'].value
    }

    this.Postulante.SignInPostulante(usuario).subscribe(
      data => {
        this.tokenstorageservice.saveToken(data.token);
        this.tokenstorageservice.saveUser(data);
        this.currentUser = this.tokenstorageservice.getUser();
        this.router.navigate(['/login/postulante/'+ this.currentUser.idPostulante +'/profile/basicinfo'])
        
    });
  }

  autenticacion(){
    
    if(this.auxusuarioid === ''){}
    else{
      this.router.navigate(['login/reclutador/'+this.auxusuarioid.idPostulante+'/profile/basicinfo'])
    } 
  }

}
