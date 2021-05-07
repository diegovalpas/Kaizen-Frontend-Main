import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import { PostulanteBasicInfoResponse} from 'src/app/pages/signin/postulante/postulante-signin-interface';
import { PostulanteService} from './postulante.service';
import { NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { PostulanteUpdate } from './postulante-interface';



@Component({
  selector: 'app-postulante',
  templateUrl: './postulante.component.html',
  styleUrls: ['./postulante.component.css']
})
export class PostulanteComponent implements OnInit {
  
  CurrentUserparam:any = [];

  Usuario : PostulanteBasicInfoResponse = {
    nombrePostulante : '',
    apellidoPostulante: '',
    ciudadPostulante: '',
    tipodocumentoPostulante: '',
    numerodocumentoPostulante: '',
    fecharegistroPostulante: '',
    generoPostulante: ''
    
  };



  CurrentUser:any;
  idPostulante:any;
  isLoginFailed = false;
  signupSuccess = false;
  errorMessage = '';

  constructor(private tokens:TokenStorageService,
      private fb:FormBuilder,
      private router:Router,
      private PostulanteService:PostulanteService,
      private route:ActivatedRoute,
      public modal:NgbModal) { }

  ngOnInit(): void {
    
    this.autenticacion();   
      
  }

  //obtener el session storage
  getUserparam(){
    this.CurrentUser = this.tokens.getUser();
    console.log(this.CurrentUser); 

    var link = this.router.navigate(['/login/postulante/'+ this.CurrentUser.idPostulante +'/profile/basicinfo']);
    if( link!= link){
      this.router.navigate(['/signup/postulante']);
    }else{
      this.idPostulante = this.CurrentUser.idPostulante;
            
      this.PostulanteService.get(this.CurrentUser.idPostulante).subscribe(
      data => {
        this.CurrentUserparam = data;
        this.Usuario.nombrePostulante = this.CurrentUserparam.nombrePostulante,
        this.Usuario.apellidoPostulante = this.CurrentUserparam.apellidoPostulante,
        this.Usuario.ciudadPostulante = this.CurrentUserparam.ciudadPostulante,
        this.Usuario.numerodocumentoPostulante = this.CurrentUserparam.numerodocumentoPostulante,
        this.Usuario.tipodocumentoPostulante = this.CurrentUserparam.tipodocumentoPostulante,
        this.Usuario.generoPostulante = this.CurrentUserparam.generoPostulante,
        this.Usuario.fecharegistroPostulante = this.CurrentUserparam.fecharegistroPostulante,
        this.Usuario.fotoperfilPostulante = this.CurrentUserparam.fotoperfilPostulante.urlImagen,
        this.Usuario.archivocvPostulante=this.CurrentUserparam.archivocvPostulante.urlArchivoCV,
        console.log(this.Usuario);  
      },

      error => {
        console.log(error);
      });
    }
  }

  // fin del sesion storage


 
  //jalar y validar datos del html  
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

//fin de validacion y jalar    
    
//actualizar datos 
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
        this.CurrentUserparam=data;
        this.CurrentUserparam.nombrePostulante = usuario.nombreUsuario;
        this.CurrentUserparam.apellidoPostulante = usuario.apellidoUsuario;
        this.CurrentUserparam.ciudadPostulante = usuario.ciudadUsuario;
        this.CurrentUserparam.tipodocumentoPostulante = usuario.tipodocumentoUsuario;
        this.CurrentUserparam.numerodocumentoPostulante = usuario.numerodocumentoUsuario;
        this.CurrentUserparam.direccionPostulante = usuario.direccionUsuario;
        this.CurrentUserparam.generoPostulante = usuario.generoUsuario;
        this.CurrentUserparam.descripcionPostulante = usuario.descripcionUsuario;
        this.CurrentUserparam.telefonoPostulante = usuario.telefonoUsuario;
        console.log(this.CurrentUserparam);
        this.signupSuccess = true; 
        window.location.reload();

      },

      err => {
        this.errorMessage = err.error.message;
        this.signupSuccess = false;
      }
    );
    

  }

  //fin de actualizar datos

  
  
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
