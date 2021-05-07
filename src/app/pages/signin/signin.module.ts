import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PostulanteSigninComponent } from './postulante/postulante-signin.component';
import { ReclutadorSigninComponent } from './reclutador/reclutador-signin.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostulanteSigninComponent,
    ReclutadorSigninComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class SigninModule { }
