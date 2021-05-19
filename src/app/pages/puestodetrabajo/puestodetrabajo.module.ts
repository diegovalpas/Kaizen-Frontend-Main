import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacionComponent } from './publicacion/publicacion.component';
import { PostulacionComponent } from './postulacion/postulacion.component';
import { ListaTrabajosComponent } from './lista-trabajos/lista-trabajos.component';
import { HomeComponent } from './home/home.component';
import { DetalletrabajoComponent } from './detalletrabajo/detalletrabajo.component';



import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListacandidatosComponent } from './listacandidatos/listacandidatos.component';
import { ProfileComponent } from './profile/profile.component';





@NgModule({
  declarations: [
    PublicacionComponent,
    PostulacionComponent,
    ListaTrabajosComponent,
    HomeComponent,
    DetalletrabajoComponent,
    ListacandidatosComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class PuestodetrabajoModule { }
