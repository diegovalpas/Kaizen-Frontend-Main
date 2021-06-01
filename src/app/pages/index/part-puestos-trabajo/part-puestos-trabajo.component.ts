import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { IndexService } from '../index.service';

@Component({
  selector: 'app-part-puestos-trabajo',
  templateUrl: './part-puestos-trabajo.component.html',
  styleUrls: []
})
export class PartPuestosTrabajoComponent implements OnInit {

  //variables
  CurrentLista: any;
  CurrentDetalleLista: any;
  p : number = 1 ;

  constructor(private indexservice:IndexService,
    private tokens:TokenStorageService,
    private route: Router) { }

  ngOnInit(): void {
    this.getListaempleospart();
  }

  getListaempleospart(){
    
    this.indexservice.getListaparamspart().subscribe(
    data => {
      this.CurrentLista = data;
      console.log(this.CurrentLista);
    },
    error => {
      console.log(error);
    });
  }
  
  Seleccionarempleo(empleo:any) {
    this.CurrentDetalleLista = empleo;
  }

  verDetalle(){
    this.tokens.saveTokenjob(this.CurrentDetalleLista.idPuestoTrabajo);
    this.route.navigate(['puestotrabajo/'+this.CurrentDetalleLista.idPuestoTrabajo+'/detail']);
  }

}
