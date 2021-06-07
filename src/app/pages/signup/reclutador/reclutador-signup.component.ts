import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ciudades, TamañoEmpresas } from 'src/app/pages/tools/data-lists';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { CustomValidators } from '../../tools/custom-validators';
import { ReclutadorSignupRequest } from './reclutador-signup-interface';
import { ReclutadorSignupService } from './reclutador-signup.service';
declare var $:any;

@Component({
  selector: 'app-reclutador-signup',
  templateUrl: './reclutador-signup.component.html',
  styles: []
})
export class ReclutadorSignupComponent implements OnInit {

 
  //Lista de Ciudades ordenados por Nombre creado en util/data-lists
  Ciudades = Ciudades.sort(function (a, b) {
    if (a.text > b.text) {
      return 1;
    }

    if(a.text < b.text) {
      return -1;
    }

    else {
      return 0;
    }
  })

  TamanioEmpresas = TamañoEmpresas;

  public reclutadorsignupForm = new FormGroup({
    
    nombreUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)")
    ])),

    ciudadUsuario: new FormControl('', 
    Validators.required),

    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),

    numerodocumentoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(10000000000),
      Validators.max(99999999999)
    ])),

    contraseñaUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { passwordnumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, {passworduppercase: true}),
      CustomValidators.patternValidator(/[a-z]/, {passwordsmallcase: true}),
      CustomValidators.patternValidator(/[@#$:\^%&]/, {passwordspecialcharacter: true})
    ])),

    nombrecontactanteUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)")
    ])),

    tamañoempresaUsuario: new FormControl('', 
    Validators.required),
    
    checkear: new FormControl('', 
    Validators.required),

    imagenUsuario: new FormControl(null)
  }); 
  isVisibleReclutador = false;
  userToken: any;

  constructor(public fb: FormBuilder,
              private reclutadorsignupServie: ReclutadorSignupService,
              private router: Router,
              private tokenstorageService: TokenStorageService) { }

  ngOnInit() {
    this.ifLogin();
  }


  signupSuccess = false;
  errorMessage = '';

  selectedLogo?: FileList;
  currentLogo?: File;

  message:any;

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


  escribir() :void {
    this.message = null;
  }

  seleccionarLogo(event: any): void {
    this.selectedLogo = event.target.files;
  }

  subirLogo(): any {
    if (this.selectedLogo) {
      const fotologo: File | null = this.selectedLogo.item(0);

      if (fotologo) {
        this.currentLogo = fotologo;
      }

      return this.currentLogo;
    }
  }

  LoadPage(){
    $('#start').css('cursor', 'wait');
  }

  guardarReclutador(): void {

    var usuario: ReclutadorSignupRequest = {
      nombreUsuario: this.reclutadorsignupForm.controls['nombreUsuario'].value,
      ciudadUsuario: this.reclutadorsignupForm.controls['ciudadUsuario'].value,
      emailUsuario: this.reclutadorsignupForm.controls['emailUsuario'].value,
      numerodocumentoUsuario: this.reclutadorsignupForm.controls['numerodocumentoUsuario'].value,
      contraseñaUsuario: this.reclutadorsignupForm.controls['contraseñaUsuario'].value,
      nombrecontactanteUsuario: this.reclutadorsignupForm.controls['nombrecontactanteUsuario'].value,
      tamañoempresaUsuario: this.reclutadorsignupForm.controls['tamañoempresaUsuario'].value
    }

    if (this.reclutadorsignupForm.invalid) {
      $('#start').css('cursor', 'default');
      return;
    }

    this.reclutadorsignupServie.SignUpReclutador(usuario, this.subirLogo()).subscribe(
      data => { 
        $('#start').css('cursor', 'default');
        console.log(data);
        this.signupSuccess = true;
        this.router.navigate(['/signin/reclutador']); 
      },

      err => {
        $('#start').css('cursor', 'default');
        this.errorMessage = err.error.message;
        this.message = this.errorMessage;
        this.signupSuccess = false;
      }
    );
  }
}



 

 
  

