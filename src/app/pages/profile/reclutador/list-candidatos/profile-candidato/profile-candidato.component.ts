import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { Router} from '@angular/router';
import { ReclutadorProfileService} from '../../reclutador-profile.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-candidato',
  templateUrl: './profile-candidato.component.html',
  styleUrls: []
})
export class ProfileCandidatoComponent implements OnInit {

  iduser:any;
  CurrentUser:any = [];
  CurrentEducacion: any ;
  CurrentExperiencia: any = [];

  constructor(private tokens:TokenStorageService,
    private reclutadorservice:ReclutadorProfileService,
    public modal:NgbModal) { }

  ngOnInit(): void {
    this.getpostulantexempleo();
    this.getEdu();
    this.getExp();
  }

  
  getpostulantexempleo(){
    this.reclutadorservice.getPostulantesByempleo(this.tokens.getTokenjob(),this.tokens.getUsuarioPerfil()).subscribe(data => {
      this.CurrentUser = data;
      console.log(this.CurrentUser);
    })
  }

  getEdu(){

    this.reclutadorservice.getEducacion(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentEducacion= data;  
        console.log(data)
      });
  }

  getExp(){

    this.reclutadorservice.getExperiencia(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentExperiencia= data;  
        console.log(data)
      });
  }

}
