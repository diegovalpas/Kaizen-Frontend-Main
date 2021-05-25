import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import { PostulanteBasicInfoResponse} from 'src/app/pages/signin/postulante/postulante-signin-interface';
import { PostulanteService} from './postulante.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PostulanteUpdate } from './postulante-interface';
import { FechaMes } from 'src/app/util/data-lists';

@Component({
  selector: 'app-postulante',
  templateUrl: './postulante.component.html',
  styleUrls: ['./postulante.component.css']
})
export class PostulanteComponent implements OnInit {
  
  //Variables
  CurrentUserparam:any = [];
  ids:any;
  CurrentUser:any;
  idPostulante:any;
  isLoginFailed = false;
  signupSuccess = false;
  errorMessage = '';
  selectedlogo: any;
  currentLogo?: File;
  CurrentUser2: any;
  ListEdu: any;
  CurrentEducacion: any;
  ListExp: any;
  CurrentExperiencia: any;

  //Datalist
  FechaMess = FechaMes ;
  
  //Objeto con Interface
  Usuario : PostulanteBasicInfoResponse = {
    nombrePostulante : '',
    apellidoPostulante: '',
    ciudadPostulante: '',
    tipodocumentoPostulante: '',
    numerodocumentoPostulante: '',
    fecharegistroPostulante: '',
    descripcionPostulante: '',
  }

  //Modal para postulante
  public postulanteModalForm = this.fb.group({
    nombreUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)")
    ])),
    apellidoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)")
    ])),
    ciudadUsuario: new FormControl('', 
    Validators.required),
    tipodocumentoUsuario: new FormControl('', 
    Validators.required),
    numerodocumentoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern("^[0-9]*$")
    ])),    
    generoUsuario: new FormControl('', 
    Validators.required),
    direccionUsuario: new FormControl('', 
    Validators.required),
    descripcionUsuario: new FormControl('', 
    Validators.required),
    telefonoUsuario: new FormControl('', 
    Validators.required),
    
    imagenUsuario: new FormControl(null),
    archivocvUsuario: new FormControl(null)
  });

  //Educacion Modal Form
  public educacionModalForm = this.fb.group({    
    
    nombreEducacion: new FormControl('', 
    Validators.required),
    institucionEducacion: new FormControl('', 
    Validators.required),
    mesinicioEducacion: new FormControl('', 
    Validators.required),
    anioinicioEducacion: new FormControl('', 
    Validators.required),
    mesfinEducacion: new FormControl('', 
    Validators.required),
    aniofinEducacion: new FormControl('', 
    Validators.required)
  }); 

  //Experiencia Modal Form
  public experienciaModalForm = this.fb.group({    
    
    nombreExperienciaLaboral: new FormControl('', 
    Validators.required),
    empresaExperienciaLaboral: new FormControl('', 
    Validators.required),
    mesinicioExperienciaLaboral: new FormControl('', 
    Validators.required),
    anioinicioExperienciaLaboral: new FormControl('', 
    Validators.required),
    mesfinExperienciaLaboral: new FormControl('', 
    Validators.required),
    aniofinExperienciaLaboral: new FormControl('', 
    Validators.required)
  }); 
  anio: any;
  anioinicio: any;
  mesinicio: any;
  mesfinal: any;

  constructor(private tokens:TokenStorageService,
      private fb:FormBuilder,
      private router:Router,
      private PostulanteService:PostulanteService,
      public modal:NgbModal) { }

  ngOnInit(): void {
    this.autenticacion();
    this.getExp();
    this.getEdu();
  }

  seleccionarLogo(event: any): void {
    this.selectedlogo = event.target.files;
  }

  Seleccionarexp(exp:any) {
    this.ListExp = exp;
    this.tokens.saveExp(this.ListExp.idExperienciaLaboral);

    var mesinicioseparador = this.ListExp.periodoinicioExperienciaLaboral
    var mesfinseparador = this.ListExp.periodofinExperienciaLaboral
    this.mesinicio = mesinicioseparador.slice(0,-5)
    this.mesfinal = mesfinseparador.slice(0,-5)

    switch (this.mesinicio) 
        {
            case 'Enero':  this.mesinicio = "01";
                     break;
            case 'Febrero':  this.mesinicio = "02";
                     break;
            case 'Marzo':  this.mesinicio = "03";
                     break;
            case 'Abril':  this.mesinicio = "04";
                     break;
            case 'Mayo':  this.mesinicio = "05";
                     break;
            case 'Junio':  this.mesinicio = "06";
                     break;
            case 'Julio':  this.mesinicio = "07";
                     break;                  
            case 'Agosto':  this.mesinicio = "08";
                     break;
            case 'Septiembre':  this.mesinicio = "09";
                     break;
            case 'Octubre':  this.mesinicio = "10";
                     break;
            case 'Noviembre':  this.mesinicio = "11";
                     break;
            case 'Diciembre':  this.mesinicio = "12";
                     break;            
        }
        switch (this.mesfinal) 
        {
            case 'Enero':  this.mesfinal = "01";
                     break;
            case 'Febrero':  this.mesfinal = "02";
                     break;
            case 'Marzo':  this.mesfinal = "03";
                     break;
            case 'Abril':  this.mesfinal = "04";
                     break;
            case 'Mayo':  this.mesfinal = "05";
                     break;
            case 'Junio':  this.mesfinal = "06";
                     break;
            case 'Julio':  this.mesfinal = "07";
                     break;                  
            case 'Agosto':  this.mesfinal = "08";
                     break;
            case 'Septiembre':  this.mesfinal = "09";
                     break;
            case 'Octubre':  this.mesfinal = "10";
                     break;
            case 'Noviembre':  this.mesfinal = "11";
                     break;
            case 'Diciembre':  this.mesfinal = "12";
                     break;            
        }  
    
      var cadenainicio = this.ListExp.periodoinicioExperienciaLaboral;
      var cadenafin = this.ListExp.periodofinExperienciaLaboral;
      this.anioinicio = cadenainicio.slice(-4);
      this.anio = cadenafin.slice(-4);
    
    console.log(this.ListExp);
  }

  SeleccionarEdu(edu:any) {
    this.ListEdu = edu;
    this.tokens.saveEdu(this.ListEdu.idEducacion);

    var mesinicioseparador = this.ListEdu.periodoinicioEducacion
    var mesfinseparador = this.ListEdu.periodofinEducacion
    this.mesinicio = mesinicioseparador.slice(0,-5)
    this.mesfinal = mesfinseparador.slice(0,-5)

    switch (this.mesinicio) 
        {
            case 'Enero':  this.mesinicio = "01";
                     break;
            case 'Febrero':  this.mesinicio = "02";
                     break;
            case 'Marzo':  this.mesinicio = "03";
                     break;
            case 'Abril':  this.mesinicio = "04";
                     break;
            case 'Mayo':  this.mesinicio = "05";
                     break;
            case 'Junio':  this.mesinicio = "06";
                     break;
            case 'Julio':  this.mesinicio = "07";
                     break;                  
            case 'Agosto':  this.mesinicio = "08";
                     break;
            case 'Septiembre':  this.mesinicio = "09";
                     break;
            case 'Octubre':  this.mesinicio = "10";
                     break;
            case 'Noviembre':  this.mesinicio = "11";
                     break;
            case 'Diciembre':  this.mesinicio = "12";
                     break;            
        }
        switch (this.mesfinal) 
        {
            case 'Enero':  this.mesfinal = "01";
                     break;
            case 'Febrero':  this.mesfinal = "02";
                     break;
            case 'Marzo':  this.mesfinal = "03";
                     break;
            case 'Abril':  this.mesfinal = "04";
                     break;
            case 'Mayo':  this.mesfinal = "05";
                     break;
            case 'Junio':  this.mesfinal = "06";
                     break;
            case 'Julio':  this.mesfinal = "07";
                     break;                  
            case 'Agosto':  this.mesfinal = "08";
                     break;
            case 'Septiembre':  this.mesfinal = "09";
                     break;
            case 'Octubre':  this.mesfinal = "10";
                     break;
            case 'Noviembre':  this.mesfinal = "11";
                     break;
            case 'Diciembre':  this.mesfinal = "12";
                     break;            
        }  
    
      var cadenainicio = this.ListEdu.periodoinicioEducacion;
      var cadenafin = this.ListEdu.periodofinEducacion;
      this.anioinicio = cadenainicio.slice(-4);
      this.anio = cadenafin.slice(-4);

    console.log(this.ListEdu);
  }

  getEdu(){
    this.PostulanteService.mostrarEducacion(this.CurrentUser.idPostulante).subscribe(
      data => {    
        this.CurrentEducacion= data;  
        console.log(data)
      });
  }

  guardarEdu(){ 

    var educacion: any = {
    nombreEducacion: this.educacionModalForm.controls['nombreEducacion'].value,
    mesinicioEducacion:this.educacionModalForm.controls['mesinicioEducacion'].value,
    anioinicioEducacion:this.educacionModalForm.controls['anioinicioEducacion'].value,
    mesfinEducacion:this.educacionModalForm.controls['mesfinEducacion'].value,
    aniofinEducacion:this.educacionModalForm.controls['aniofinEducacion'].value,
    institucionEducacion: this.educacionModalForm.controls['institucionEducacion'].value     
    }
  
    this.PostulanteService.guardarEducacion( this.CurrentUser.idPostulante, educacion).subscribe(
      data => {     
      this.CurrentEducacion = data;
      console.log(data);
      window.location.reload();
    });    
  }

  editaEdu(){
    var educacion: any = {
      nombreEducacion: this.educacionModalForm.controls['nombreEducacion'].value,
      mesinicioEducacion: this.educacionModalForm.controls['mesinicioEducacion'].value,
      anioinicioEducacion: this.educacionModalForm.controls['anioinicioEducacion'].value,
      mesfinEducacion: this.educacionModalForm.controls['mesfinEducacion'].value,
      aniofinEducacion : this.educacionModalForm.controls['aniofinEducacion'].value,
      institucionEducacion: this.educacionModalForm.controls['institucionEducacion'].value     
    }
    this.PostulanteService.actualizarEducacion(this.ListEdu.idEducacion, educacion).subscribe(
    data => {
      console.log(data);
    })
  }

  deleteEdu(){   
    this.PostulanteService.borrarEducacion( this.ListEdu.idEducacion).subscribe(
      data => {    
        console.log(data);
        window.location.reload();
      });
  }
  
  getExp(){
    this.PostulanteService.mostrarExperiencia( this.CurrentUser.idPostulante).subscribe(
      data => {    
        this.CurrentExperiencia= data;
        console.log(data)
      });       
  }

  guardarExp(){ 
   
    var experiencia: any = {
      nombreExperienciaLaboral: this.experienciaModalForm.controls['nombreExperienciaLaboral'].value,
      mesinicioExperienciaLaboral: this.experienciaModalForm.controls['mesinicioExperienciaLaboral'].value,
      anioinicioExperienciaLaboral: this.experienciaModalForm.controls['anioinicioExperienciaLaboral'].value,
      mesfinExperienciaLaboral: this.experienciaModalForm.controls['mesfinExperienciaLaboral'].value,
      aniofinExperienciaLaboral : this.experienciaModalForm.controls['aniofinExperienciaLaboral'].value,
      empresaExperienciaLaboral: this.experienciaModalForm.controls['empresaExperienciaLaboral'].value     
    }
  
    this.PostulanteService.guardarExperiencia(this.CurrentUser.idPostulante, experiencia).subscribe(
      data => {    
        data;
        console.log(data);
        window.location.reload();    
      });    
  }

  updateExp(){ 
       
      var experiencia: any = {
        nombreExperienciaLaboral: this.experienciaModalForm.controls['nombreExperienciaLaboral'].value,
        mesinicioExperienciaLaboral: this.experienciaModalForm.controls['mesinicioExperienciaLaboral'].value,
        anioinicioExperienciaLaboral: this.experienciaModalForm.controls['anioinicioExperienciaLaboral'].value,  
        mesfinExperienciaLaboral:  this.experienciaModalForm.controls['mesfinExperienciaLaboral'].value,
        aniofinExperienciaLaboral: this.experienciaModalForm.controls['aniofinExperienciaLaboral'].value,
        empresaExperienciaLaboral: this.experienciaModalForm.controls['empresaExperienciaLaboral'].value    
      }
  
      this.PostulanteService.actualizarExperiencia(this.ListExp.idExperienciaLaboral, experiencia).subscribe(
        data => {    
          console.log(data)
          window.location.reload()
        })
    }

  deleteExp(){
    this.PostulanteService.borrarExperiencia( this.ListExp.idExperienciaLaboral).subscribe(
      data => {    
        console.log(data);
        window.location.reload();
      });
  }

  getUserparam(){
    this.CurrentUser = this.tokens.getUser();

    var link = this.router.navigate(['/login/postulante/'+ this.CurrentUser.idPostulante +'/profile/basicinfo']);
    if( link!= link){
      this.router.navigate(['/signup/postulante']);
    }else{
      this.idPostulante = this.CurrentUser.idPostulante;   
      this.PostulanteService.getUserLogin(this.CurrentUser.idPostulante).subscribe(
      data => {
        this.CurrentUserparam = data;
        this.Usuario.nombrePostulante = this.CurrentUserparam.nombrePostulante,
        this.Usuario.apellidoPostulante = this.CurrentUserparam.apellidoPostulante,
        this.Usuario.numerodocumentoPostulante = this.CurrentUserparam.numerodocumentoPostulante,
        this.Usuario.tipodocumentoPostulante = this.CurrentUserparam.tipodocumentoPostulante,
        this.Usuario.descripcionPostulante = this.CurrentUserparam.descripcionPostulante,
        this.Usuario.fecharegistroPostulante = this.CurrentUserparam.fecharegistroPostulante,
        this.Usuario.fotoperfilPostulante = this.CurrentUserparam.fotoperfilPostulante.urlImagen,
        this.Usuario.archivocvPostulante=this.CurrentUserparam.archivocvPostulante.urlArchivoCV,
        console.log(this.CurrentUserparam);  
      },
      error => {
        console.log(error);
      })
    }
  }

  updateUserparam(){ 

    var usuario: PostulanteUpdate = {
      nombreUsuario: this.postulanteModalForm.controls['nombreUsuario'].value,
      apellidoUsuario: this.postulanteModalForm.controls['apellidoUsuario'].value,
      ciudadUsuario: this.postulanteModalForm.controls['ciudadUsuario'].value,
      tipodocumentoUsuario: this.postulanteModalForm.controls['tipodocumentoUsuario'].value,
      numerodocumentoUsuario: this.postulanteModalForm.controls['numerodocumentoUsuario'].value,
      generoUsuario: this.postulanteModalForm.controls['generoUsuario'].value,
      direccionUsuario: this.postulanteModalForm.controls['direccionUsuario'].value,
      descripcionUsuario: this.postulanteModalForm.controls['descripcionUsuario'].value,
      telefonoUsuario: this.postulanteModalForm.controls['telefonoUsuario'].value
    }

    this.PostulanteService.update(usuario, this.CurrentUser.idPostulante).subscribe(
      data => {         
        this.CurrentUserparam = data;
        this.CurrentUserparam.nombrePostulante = usuario.nombreUsuario;
        this.CurrentUserparam.apellidoPostulante = usuario.apellidoUsuario;
        this.CurrentUserparam.ciudadPostulante = usuario.ciudadUsuario;
        this.CurrentUserparam.tipodocumentoPostulante = usuario.tipodocumentoUsuario;
        this.CurrentUserparam.numerodocumentoPostulante = usuario.numerodocumentoUsuario;
        this.CurrentUserparam.direccionPostulante = usuario.direccionUsuario;
        this.CurrentUserparam.generoPostulante = usuario.generoUsuario;
        this.CurrentUserparam.descripcionPostulante = usuario.descripcionUsuario;
        this.CurrentUserparam.telefonoPostulante = usuario.telefonoUsuario;
        this.signupSuccess = true;

        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.signupSuccess = false;
      })
  }

  subirFoto(): any {
  if (this.selectedlogo) {
    const logo: File | null = this.selectedlogo.item(0);
    if (logo) {
      this.currentLogo = logo;
    }
    return this.currentLogo;
    }
  }

  UpdateFoto(){
  
  this.PostulanteService.updateLogo(this.subirFoto(),this.CurrentUser.idPostulante).subscribe(
    data => { 
      this.CurrentUser2 = data;
      this.CurrentUser2.fotoperfilPostulante = this.currentLogo;
      this.signupSuccess = true; 
      window.location.reload();
      
    },
    err => {
      this.errorMessage = err.error.message;
      this.signupSuccess = false;
    });
  }

  EnviarLinkalEmail(){
    var usuario: any = {
      emailUsuario: this.CurrentUser.emailReclutador
    }

    this.PostulanteService.getEmail(usuario).subscribe(
      data => {
        this.tokens.saveToken(data.passwordresetToken);
        console.log(data);
    })
  }

  autenticacion(){

    if(this.tokens.getToken()){
      this.getUserparam();
      this.isLoginFailed = true;
    }else{
      this.Salir();
    } 
  }

  Salir(){
    this.tokens.signOut();
    this.router.navigate(['/signin/postulante'])
  }

}
