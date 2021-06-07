import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: []
})
export class NavigationComponent implements OnInit {

  Postulantetoken: any;
  ReclutadorToken: any;
  UsuarioToken:any;
  isVisibleReclutador = false;
  isVisible = false;
  isVisiblePostulaciones = false;
  isOcultar = false;
  isMostrar = false;
  isVisibleButton = false;

  PersonaToken: any;
  salir: any;
  constructor(private tokens: TokenStorageService) { }

  ngOnInit(): void {
    this.verMisPostulaciones();
    this.verPerfilReclutador();
    this.deshabilitarBotones();
    this.verMiPerfil();
  }

  verMisPostulaciones( ){

    if(this.tokens.getUser()){
      this.Postulantetoken = this.tokens.getUser()
      console.log(this.Postulantetoken.idPostulante)
      if(this.Postulantetoken.idReclutador !== undefined){          
      }
      if(this.Postulantetoken.idPostulante !== undefined ){
        this.isVisiblePostulaciones = true;
      }
    }
    if(this.tokens.getToken() === null){
      this.isVisiblePostulaciones = false;
    }
  }

  verPerfilReclutador(){

    if(this.tokens.getUser()){
      this.ReclutadorToken = this.tokens.getUser()
      if(this.ReclutadorToken.idPostulante !== undefined){        
        
      }
      if(this.ReclutadorToken.idReclutador !== undefined){
        this.isVisibleReclutador = true;
      }
    }
    if(this.tokens.getToken() === null){
      this.isVisibleReclutador = false;
    }
  } 
  
  verMiPerfil( ){

    if(this.tokens.getUser()){
      this.Postulantetoken = this.tokens.getUser()
      console.log(this.Postulantetoken.idPostulante)
      if(this.Postulantetoken.idReclutador !== undefined){    
        this.isMostrar = true;      
      }
      if(this.Postulantetoken.idPostulante !== undefined ){
        this.isMostrar = true;
      }
    }
    if(this.tokens.getToken() === null){
      this.isMostrar = false;
    }
  }  

  Salir(){
    this.salir = this.tokens.getUser()
    if(this.salir.idPostulante !== undefined){
      this.tokens.signOut();
      window.location.href ='/signin/postulante';
    }else{
      this.tokens.signOut();
      window.location.href = '/signin/reclutador';
    }
    
  }

  deshabilitarBotones(){

    if(this.tokens.getUser()){
      this.UsuarioToken = this.tokens.getUser()
      if(this.UsuarioToken.idPostulante !== undefined || this.UsuarioToken.idReclutador !== undefined ){        
        this.isVisible = false;
        this.isVisibleButton = true;
      } 
      else{
        this.isVisible = true;
        this.isVisibleButton = false;
      }         
    } 
  }

}
