import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from 'src/app/util/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: []
})
export class NavigationComponent implements OnInit {

  //variables
  CurrentUsuario:any;
  auxUsertoken:any;
  redirect:any;

  constructor(private tokens:TokenStorageService,private route:Router) { }

  ngOnInit(): void {
    //metodos cuando se inicializa la pagina
    this.condicional();
  }

  VerPerfil(){
    if(this.tokens.getUser()){
      this.auxUsertoken = this.tokens.getUser()
      if(this.auxUsertoken.idReclutador !== undefined){
        this.route.navigate(['/reclutador/'+this.auxUsertoken.idReclutador+'/profile']);
      }
      if(this.auxUsertoken.idPostulante !== undefined){
        this.route.navigate(['/postulante/'+this.auxUsertoken.idPostulante+'/profile']);
      }
    }
    if(this.tokens.getToken() === null){
        this.route.navigate(['/signin/postulante']);
    }
  }

  condicional(){
    if(this.tokens.getUser()){
      this.auxUsertoken = this.tokens.getUser()
      if(this.auxUsertoken.idReclutador !== undefined){
        this.redirect='Mis publicaciones';
      }
      if(this.auxUsertoken.idPostulante !== undefined){
        this.redirect='Mis postulaciones';
      }
    }
    if(this.tokens.getToken() === null || this.tokens.getToken() === undefined){
        this.redirect='Mis postulaciones';
    }
  }
  direccion(){
    if(this.tokens.getUser()){
      this.auxUsertoken = this.tokens.getUser()
      if(this.auxUsertoken.idReclutador !== undefined){
        this.route.navigate(['/publicaciones']);
      }
      if(this.auxUsertoken.idPostulante !== undefined){
        this.route.navigate(['/postulante/'+this.auxUsertoken.idPostulante+'/postulaciones']);
      }
    }
    if(this.tokens.getToken() === null || this.tokens.getToken() === undefined){
        this.route.navigate(['/signin/postulante']);
    }
  }

}
