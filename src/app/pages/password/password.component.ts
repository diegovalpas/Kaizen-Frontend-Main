import { Component, OnInit } from '@angular/core';
import {PasswordService} from 'src/app/pages/password/password.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {TokenStorageService} from 'src/app/util/token-storage.service'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: []
})
export class PasswordComponent implements OnInit {

  public passwordform = this.fb.group({     
    
    emailusuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ]))     
  });


  constructor(private passwordservice:PasswordService,
              private fb:FormBuilder,
              private tokenstorage:TokenStorageService) { }

  ngOnInit(): void {
  }

  EnviarLinkalEmail(){
    var usuario: any = {
      emailUsuario: this.passwordform.controls['emailusuario'].value
    }
    this.passwordservice.getEmail(usuario.emailUsuario).subscribe(
      data => {
        this.tokenstorage.saveToken(data.passwordresetToken
          );
        console.log(data);
    }
    )

  }



}
          