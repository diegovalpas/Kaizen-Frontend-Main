import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { IndexService } from '../index.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-puestos-trabajo',
  templateUrl: './recent-puestos-trabajo.component.html',
  styleUrls: []
})
export class RecentPuestosTrabajoComponent implements OnInit {

  //variables
  CurrentLista: any;
  CurrentDetalleLista: any;
  p : number = 1 ;

  constructor(private indexservice:IndexService,
    private tokens:TokenStorageService,
    private route: Router) { }

  ngOnInit(): void {
    this.getListaempleos();
  }

  getListaempleos(){
    
    this.indexservice.getListaparams().subscribe(
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
