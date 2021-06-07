import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../util/token-storage.service';
import { PostulanteProfileService } from './postulante-profile.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasicInfoPostulanteProfile } from './postulante-profile-interface';
import { PasswordRequestService } from '../../reset_password/password-request/password-request.service';
import { PasswordRequest } from '../../reset_password/password-request/password-request-interface';
declare const $:any;

@Component({
  selector: 'app-postulante-profile',
  templateUrl: './postulante-profile.component.html',
  styleUrls: []
})

export class PostulanteProfileComponent implements OnInit {

  isLoginFailed: boolean = false;

  currentPostulante: any;
  idPostulante: any;

  basicinfoData: any = {};
  basicInfo: any = {};

  passwordrequestData: any = {};

  public postulantebasicinfoupdateForm = this.fb.group({
    
    descripcionUsuario: new FormControl('', Validators.minLength(5)),
    
    tituloUsuario: new FormControl('', Validators.minLength(3)),
    
    direccionUsuario: new FormControl('', Validators.minLength(5)),
    
    telefonoUsuario: new FormControl('', Validators.compose([
      Validators.min(1000000),
      Validators.max(999999999)
    ])),

    imagenUsuario: new FormControl(null), 

    archivocvUsuario: new FormControl(null)
  });
  CurrentUser2: any;
  currentLogo?: File;
  currentcv?: File;
  signupSuccess = false;
  selectedlogo: any;
  selectedcv: any;
  CurrentUser3: any;

  constructor(private tokenService: TokenStorageService,
              private postulanteprofileService: PostulanteProfileService,
              private passwordrequestService: PasswordRequestService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.Auth();
  }

  errorMessage = '';

  Auth() {
    if (this.tokenService.getToken()) {
      this.getprofileBasicInfo();
      this.isLoginFailed = true;
    } else {
      this.Exit();
    }
  }


  Exit() {
    this.tokenService.signOut();
    this.router.navigate(['/signin/postulante']);
  }

  getprofileBasicInfo() {
    this.currentPostulante = this.tokenService.getUser();
    this.idPostulante = this.currentPostulante.idPostulante;

    this.postulanteprofileService.BasicInfo(this.currentPostulante.idPostulante).subscribe(
      data => {
        this.basicinfoData = data;
        this.basicInfo.nombrePostulante = this.basicinfoData.nombrePostulante + ' ' + this.basicinfoData.apellidoPostulante,
        this.basicInfo.apellidoPostulante = this.basicinfoData.apellidoPostulante,
        this.basicInfo.direccionPostulante = this.basicinfoData.direccionPostulante,
        this.basicInfo.emailPostulante = this.basicinfoData.emailPostulante,
        this.basicInfo.telefonoPostulante = this.basicinfoData.telefonoPostulante,
        this.basicInfo.descripcionPostulante = this.basicinfoData.descripcionPostulante,
        this.basicInfo.tituloPostulante = this.basicinfoData.tituloPostulante,
        this.basicInfo.imagen = this.basicinfoData.fotoperfilPostulante.urlImagen,
        this.basicInfo.nombreimagen = this.basicinfoData.fotoperfilPostulante.nombreImagen,
        this.basicInfo.archivocvPostulante = this.basicinfoData.archivocvPostulante.urlArchivoCV
        console.log(this.basicInfo)
        if (this.basicInfo.descripcionPostulante){ 
          this.basicInfo.descripcionPostulante = this.basicInfo.descripcionPostulante.replace(/\n/g, '<br />');        }
      }
    );
  }

  updateBasicInfo() {
    var postulante: BasicInfoPostulanteProfile = {
      descripcionUsuario: this.postulantebasicinfoupdateForm.controls['descripcionUsuario'].value,
      tituloUsuario: this.postulantebasicinfoupdateForm.controls['tituloUsuario'].value,
      direccionUsuario: this.postulantebasicinfoupdateForm.controls['direccionUsuario'].value,
      telefonoUsuario: this.postulantebasicinfoupdateForm.controls['telefonoUsuario'].value,
    }

    if (this.postulantebasicinfoupdateForm.invalid) {
      return;
    }

    this.postulanteprofileService.UpdateBasicInfo(postulante, this.currentPostulante.idPostulante).subscribe(
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

      emailUsuario: this.basicinfoData.emailPostulante
    }
    this.passwordrequestService.PasswordRequest(passwordRequest).subscribe(
      data => {
        this.passwordrequestData = data;
        localStorage.setItem('passwordresetToken', this.passwordrequestData.passwordresetToken);
        console.log(this.passwordrequestData);
      }
    )
  }

  GuardarFoto(event: any): void {
    this.selectedlogo = event.target.files;
    if (this.selectedlogo) {
      const logo: File | null = this.selectedlogo.item(0);
      if (logo) {
        this.currentLogo = logo;
        console.log(this.currentLogo);
        this.postulanteprofileService.updateLogo(this.currentLogo,this.currentPostulante.idPostulante).subscribe(
          data => {
            this.CurrentUser2 = data;
            this.signupSuccess = true;
            $('#start').css('cursor', 'default'); 
            window.location.reload();
            
          },
          err => {
            this.errorMessage = err.error.message;
            this.signupSuccess = false;
            $('#start').css('cursor', 'default');
          }
        );
      }
    }
  }

  GuardarCV(event:any):void {
    this.selectedcv = event.target.files;
    if (this.selectedcv) {
      const cv: File | null = this.selectedcv.item(0);
      if (cv) {
        this.currentcv = cv;
        console.log(this.currentcv);
        this.postulanteprofileService.updatecv(this.currentcv,this.currentPostulante.idPostulante).subscribe(
          data => { 
            this.CurrentUser3 = data;
            this.signupSuccess = true;
            $('#start').css('cursor', 'default');
            window.location.reload();
            
          },
          err => {
            this.errorMessage = err.error.message;
            this.signupSuccess = false;
            $('#start').css('cursor', 'default');
          }
        );
      }
    }
  }

  LoadPage(){
    $('#start').css('cursor', 'wait');
  }
  
  Salir(){
      this.tokenService.signOut();
      this.router.navigate(['/signin/postulante'])
  }
}
