import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import {PasswordService} from 'src/app/pages/password/password.service';
import {TokenStorageService} from 'src/app/util/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router'
@Component({
  selector: 'app-passwordupdate',
  templateUrl: './passwordupdate.component.html',
  styleUrls: []
})
export class PasswordupdateComponent implements OnInit {
  acceso:any = [];

  public passwordformulario = this.fb.group({     
  
    token: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    contrasenia: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    contraseniavalid: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ]))   
  });

  constructor(private passwordservice:PasswordService,
              private fb:FormBuilder,
              private tokenstorage:TokenStorageService,
              private router:ActivatedRoute,
              private route:Router) { }

  ngOnInit(): void {
    if(this.tokenstorage.getToken()){

    }else{
      this.route.navigate(['/signin/postulante'])
    }
     
  }

  
  Actualizarcon(){

    var validacion:any = {
      contraseniavalid: this.passwordformulario.controls['contraseniavalid'].value
    }
    
    var passwordchanges: any = {
      contrasenia: this.passwordformulario.controls['contrasenia'].value,
      token: this.tokenstorage.getToken()
    }

    if(passwordchanges.contrasenia === validacion.contraseniavalid){
      this.passwordservice.updatePassword(passwordchanges).subscribe(
        data => {
          this.acceso = data
          this.acceso.contraseña = passwordchanges.Contra;
          console.log(data);
      })
      this.tokenstorage.signOut();
    }else{
      console.log("contraseñas no coinciden")
    }
  }

}
