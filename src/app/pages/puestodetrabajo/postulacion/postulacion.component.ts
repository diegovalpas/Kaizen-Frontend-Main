import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PostulacionService} from './postulacion.service';
import { TokenStorageService } from 'src/app/util/token-storage.service'


@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: []
})
export class PostulacionComponent implements OnInit {
  currentUser: any;

  constructor( private fb:FormBuilder,
               private postulacionservice: PostulacionService,
               private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  public puestostrabajoform = this.fb.group({     
    
    idpuestotrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
  })

    Postularempleo(): void {
      
      var work: any = {
        idpuestotrabajo: this.puestostrabajoform.controls['idpuestotrabajo'].value,
      }

      this.postulacionservice.PostularTrabajoenDetalle(this.currentUser.idPostulante,work.idpuestotrabajo).subscribe(
        data => {
          console.log(data);
      });
    }


  }
