import { Component, OnInit } from '@angular/core';
import {PasswordService} from 'src/app/pages/password/password.service';
import {TokenStorageService} from 'src/app/util/token-storage.service';
import {Router,ActivatedRoute} from '@angular/router';
import { FormBuilder,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {

  acceso:any = [];
  public passwordformulario = this.fb.group({     
    
    token: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    contraseña: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ]))   
  });

  constructor(private passwordservice:PasswordService,
              private tokenstorage: TokenStorageService,
              private route:Router,
              private router:ActivatedRoute,
              private fb:FormBuilder ) { }

  ngOnInit(): void {
    
    if(this.tokenstorage.getToken()){
      this.cargarLink();
      //this.route.navigate(['/postulante/update']);
    }else{
      this.route.navigate(['/signin/postulante']);
    }
   }
  

  cargarLink(){
    var token = this.tokenstorage.getToken();
    this.passwordservice.getPagina(token)
  }

  

}
