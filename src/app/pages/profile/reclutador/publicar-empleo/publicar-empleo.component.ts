import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PublicarEmpleoService} from './publicar-empleo.service';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { Ciudades, Categorias, TipoPostulacion, Experiencia,Publicacion, Remoto} from '../../../tools/data-lists';

@Component({
  selector: 'app-publicar-empleo',
  templateUrl: './publicar-empleo.component.html',
  styleUrls: []
})
export class PublicarEmpleoComponent implements OnInit {

   //Variables
   currentUser: any;
  
   //Datalist
   Categorias = Categorias;
   TipoPostulacion =TipoPostulacion;
   Experiencia = Experiencia;
   Publicacion = Publicacion;
   Remoto = Remoto;
 
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
 
   //Formulario que conecta con el HTML
   public puestostrabajoform = this.fb.group({     
     
     nombrePuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])), 
     ciudadPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])), 
     categoriaPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])), 
     trabajoremotoPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])),        
     tipojornadaPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])), 
     sueldoPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])), 
     experienciaPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])), 
     descripcionPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])),
     periodopublicacionPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ]))
   });
 

  constructor(private fb: FormBuilder,
              private PublicarEmpleoService: PublicarEmpleoService,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  Publicarempleo(): void {
    var puestowork: any = {
      nombrePuestoTrabajo: this.puestostrabajoform.controls['nombrePuestoTrabajo'].value,
      ciudadPuestoTrabajo: this.puestostrabajoform.controls['ciudadPuestoTrabajo'].value,
      categoriaPuestoTrabajo: this.puestostrabajoform.controls['categoriaPuestoTrabajo'].value,
      trabajoremotoPuestoTrabajo: this.puestostrabajoform.controls['trabajoremotoPuestoTrabajo'].value,
      tipojornadaPuestoTrabajo: this.puestostrabajoform.controls['tipojornadaPuestoTrabajo'].value,
      sueldoPuestoTrabajo: this.puestostrabajoform.controls['sueldoPuestoTrabajo'].value,
      experienciaPuestoTrabajo: this.puestostrabajoform.controls['experienciaPuestoTrabajo'].value,
      descripcionPuestoTrabajo: this.puestostrabajoform.controls['descripcionPuestoTrabajo'].value,
      periodopublicacionPuestoTrabajo: this.puestostrabajoform.controls['periodopublicacionPuestoTrabajo'].value
    }

    this.PublicarEmpleoService.Publicar(puestowork,this.currentUser.idReclutador).subscribe(
      data => {
        console.log(data);
    });
  }

}
