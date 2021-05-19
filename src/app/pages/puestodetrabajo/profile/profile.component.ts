import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute,Router, ParamMap} from '@angular/router';
import { EmpleosService} from 'src/app/pages/puestodetrabajo/empleos/empleos.service';
import { NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tokenid:any;
  CurrentUser:any = [];

  /*Usuario : PostulanteBasicInfoResponse = {
    nombrePostulante : '',
    apellidoPostulante: '',
    ciudadPostulante: '',
    tipodocumentoPostulante: '',
    numerodocumentoPostulante: '',
    fecharegistroPostulante: '',
    generoPostulante: ''
    
  };*/


  constructor(private tokens:TokenStorageService,
    private fb:FormBuilder,
    private router:Router,
    private empleoservice:EmpleosService,
    private route:ActivatedRoute,
    public modal:NgbModal) { }

  ngOnInit(): void {
    this.getpostulantexempleo();
  }

  getpostulantexempleo(){
    this.empleoservice.getPostulantesByempleo(this.tokens.getTokenjob(),this.tokens.getUsuarioPerfil()).subscribe(data => {
      this.CurrentUser = data;
      console.log(this.CurrentUser);
    })
  }

}
