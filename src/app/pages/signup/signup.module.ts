import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulanteSignupComponent } from './postulante/postulante-signup.component';
import { ReclutadorSignupComponent } from './reclutador/reclutador-signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostulanteSignupComponent,
    ReclutadorSignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SignupModule { }
