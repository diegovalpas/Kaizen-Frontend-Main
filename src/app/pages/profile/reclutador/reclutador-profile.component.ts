import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../util/token-storage.service';
import { Router } from '@angular/router';
import { ReclutadorProfileService } from './reclutador-profile.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasicInfoReclutadorProfile } from './reclutador-profile-interface';
import { PasswordRequestService } from '../../reset_password/password-request/password-request.service';
import { PasswordRequest } from '../../reset_password/password-request/password-request-interface';
import * as $ from 'jquery';

@Component({
  selector: 'app-reclutador-profile',
  templateUrl: './reclutador-profile.component.html',
  styleUrls: []
})

export class ReclutadorProfileComponent implements OnInit {

  currentReclutador: any;
  idReclutador: any;

  basicinfoData: any = {};
  basicInfo: any = {};

  passwordrequestData: any = {};
  CurrentUserparam:any = [];
  Usuario:any = {};
  
  CurrentUser:any;
  CurrentUser2:any;
  CurrentUser3:any;
  isLoginFailed = false;
  signupSuccess = false;
  errorMessage = '';
  TamanioEmpresaReclutador: any;

  auxnombreReclutador: any = '';

  selectedlogo: any;
  currentLogo?: File;

  public reclutadorbasicinfoupdateForm = this.fb.group({
    
    descripcionUsuario: new FormControl('', Validators.minLength(5)),
    
    tituloUsuario: new FormControl('', Validators.minLength(3)),
    
    direccionUsuario: new FormControl('', Validators.minLength(5)),
    
    telefonoUsuario: new FormControl('', Validators.compose([
      Validators.min(1000000),
      Validators.max(999999999)
    ])),

    nombrecontactanteUsuario: new FormControl('', Validators.compose([
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)"),
      Validators.minLength(6),
      Validators.maxLength(60)
    ])),

    imagenUsuario: new FormControl(null)
  });

  constructor(private tokenService: TokenStorageService,
              private reclutadorprofileService: ReclutadorProfileService,
              private passwordrequestService: PasswordRequestService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.Auth();
  }


  Auth() {
    if (this.tokenService.getToken()) {
      this.GetProfileBasicInfo();
      this.isLoginFailed = true;
    } else {
      this.Exit();
    }
  }

  Exit() {
    this.tokenService.signOut();
    this.router.navigate(['/signin/reclutador']);
  }

  GetProfileBasicInfo() {

    this.currentReclutador = this.tokenService.getUser();
    this.idReclutador = this.currentReclutador.idReclutador;

    this.reclutadorprofileService.BasicInfo(this.currentReclutador.idReclutador).subscribe(
      data => {
        this.basicinfoData = data;
        this.basicInfo.nombreReclutador = this.basicinfoData.nombreReclutador,
        this.basicInfo.tituloReclutador = this.basicinfoData.tituloReclutador,
        this.basicInfo.descripcionReclutador = this.basicinfoData.descripcionReclutador,
        this.basicInfo.direccionReclutador = this.basicinfoData.direccionReclutador,
        this.basicInfo.emailReclutador = this.basicinfoData.emailReclutador,
        this.basicInfo.telefonoReclutador = this.basicinfoData.telefonoReclutador,
        this.basicInfo.nombrecontactanteReclutador = this.basicinfoData.nombrecontactanteReclutador,
        this.basicInfo.logoempresaReclutador = this.basicinfoData.logoempresaReclutador
        
        console.log(this.basicInfo);
      }
    );
  }

  updateBasicInfo() {
    var postulante: BasicInfoReclutadorProfile = {
      descripcionUsuario: this.reclutadorbasicinfoupdateForm.controls['descripcionUsuario'].value,
      tituloUsuario: this.reclutadorbasicinfoupdateForm.controls['tituloUsuario'].value,
      direccionUsuario: this.reclutadorbasicinfoupdateForm.controls['direccionUsuario'].value,
      telefonoUsuario: this.reclutadorbasicinfoupdateForm.controls['telefonoUsuario'].value,
      nombrecontactanteUsuario: this.reclutadorbasicinfoupdateForm.controls['nombrecontactanteUsuario'].value
    }

    if (this.reclutadorbasicinfoupdateForm.invalid) {
      return;
    }

    this.reclutadorprofileService.UpdateBasicInfo(postulante, this.currentReclutador.idReclutador).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },

      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  PasswordRequest(): void{
    var passwordRequest: PasswordRequest = {

      emailUsuario: this.basicinfoData.emailReclutador
    }
    this.passwordrequestService.PasswordRequest(passwordRequest).subscribe(
      data => {
        this.passwordrequestData = data;
        localStorage.setItem('passwordresetToken', this.passwordrequestData.passwordresetToken);
        console.log(this.passwordrequestData);
      }
    )
  }

  //codigo que falta agregar al HTML
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
    
    this.reclutadorprofileService.updateLogo(this.subirLogo(),this.CurrentUser.idReclutador).subscribe(
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

}
