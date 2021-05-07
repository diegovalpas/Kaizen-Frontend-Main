import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PostulanteComponent} from './postulante/postulante.component';
import { ReclutadorComponent} from './reclutador/reclutador.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PostulanteComponent,
    ReclutadorComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    FormsModule,
    
  ]
})
export class LoginModule { }