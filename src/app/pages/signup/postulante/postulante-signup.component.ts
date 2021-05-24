import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PostulanteSignupService } from './postulante-signup.service';
import { PostulanteSignupRequest } from './postulante-signup-interface';
import { Ciudades, Sexos, TiposDocumento } from '../../../util/data-lists';
import { Router} from '@angular/router'
import { CustomValidators } from '../../tools/custom-validators';

@Component({
  selector: 'app-postulante-signup',
  templateUrl: './postulante-signup.component.html',
  styles: []
})
export class PostulanteSignupComponent implements OnInit{

  //Variables
  selectedGender:any = '';
  signupSuccess = false;
  errorMessage = '';
  selectedFotosPerfil?: FileList;
  currentFotoPerfil?: File;
  selectedArchivoCV?: FileList;
  currentArchivoCV?: File;
  
  //Datalist
  TiposDocumento = TiposDocumento;
  Sexos = Sexos;
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

  //Validaciones para el HTML
  public postulantesignupForm = this.fb.group({
    nombreUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)")
    ])),
    apellidoUsuario: new FormControl('', Validators.compose([
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
    tipodocumentoUsuario: new FormControl('', 
    Validators.required),
    numerodocumentoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(10000000),
      Validators.max(999999999999)
    ])),
    //Regex 
    contraseñaUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { passwordnumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, {passworduppercase: true}),
      CustomValidators.patternValidator(/[a-z]/, {passwordsmallcase: true}),
      CustomValidators.patternValidator(/[@#$:!\^%&]/, {passwordspecialcharacter: true})
    ])),
    generoUsuario: new FormControl('', 
    Validators.required),

    imagenUsuario: new FormControl(null),
    archivocvUsuario: new FormControl(null)
  });
  
  constructor(private fb: FormBuilder,
              private postulantesignupService: PostulanteSignupService,
              private router: Router) { }

  ngOnInit(): void {}

  seleccionarFotoPerfil(event: any): void {
    this.selectedFotosPerfil = event.target.files;
  }

  subirFotoPerfil(): any {
    if (this.selectedFotosPerfil) {
      const fotoperfil: File | null = this.selectedFotosPerfil.item(0);

      if (fotoperfil) {
        this.currentFotoPerfil = fotoperfil;
      }

      return this.currentFotoPerfil;
    }
  }

  seleccionarArchivoCV(event: any): void {
    this.selectedArchivoCV = event.target.files;
  }

  subirArchivoCV(): any {
    if (this.selectedArchivoCV) {
      const archivocv: File | null = this.selectedArchivoCV.item(0);

      if (archivocv) {
        this.currentArchivoCV = archivocv;
      }

      return this.currentArchivoCV;
    }
  }

  guardarPostulante(): void {

    var usuario: PostulanteSignupRequest = {
      nombreUsuario: this.postulantesignupForm.controls['nombreUsuario'].value,
      apellidoUsuario: this.postulantesignupForm.controls['apellidoUsuario'].value,
      ciudadUsuario: this.postulantesignupForm.controls['ciudadUsuario'].value,
      emailUsuario: this.postulantesignupForm.controls['emailUsuario'].value,
      tipodocumentoUsuario: this.postulantesignupForm.controls['tipodocumentoUsuario'].value,
      numerodocumentoUsuario: this.postulantesignupForm.controls['numerodocumentoUsuario'].value,
      contraseñaUsuario: this.postulantesignupForm.controls['contraseñaUsuario'].value,
      generoUsuario: this.selectedGender
    }

    this.postulantesignupService.SignUpPostulante(usuario, this.subirFotoPerfil(), this.subirArchivoCV()).subscribe(
      data => { 
        console.log(data);
        this.signupSuccess = true;
        this.router.navigate(['/signin/postulante']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.signupSuccess = false;
      })
  }

  //Seleccionar RadioButton(Genero)
  RBselectedGender (event:any){
    this.selectedGender = event.target.value;
  }
}
