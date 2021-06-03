import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostulanteProfileComponent } from './postulante/postulante-profile.component';
import { ReclutadorProfileComponent } from './reclutador/reclutador-profile.component';
import { NavbarModule } from '../nav-bars/nav-bars.module';
import { PostempleoComponent } from './reclutador/postempleo/postempleo.component';
import { ListCandidatosComponent } from './reclutador/list-candidatos/list-candidatos.component';
import { ListEmpleosComponent } from './reclutador/list-empleos/list-empleos.component';
import { EstudiosComponent } from './postulante/estudios/estudios.component';
import { ExperienciaLaboralComponent } from './postulante/experiencia-laboral/experiencia-laboral.component';
import { PostulacionesComponent } from './postulante/postulaciones/postulaciones.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileCandidatoComponent } from './reclutador/list-candidatos/profile-candidato/profile-candidato.component';

@NgModule({
  declarations: [
    PostulanteProfileComponent,
    ReclutadorProfileComponent,
    PostempleoComponent,
    ListCandidatosComponent,
    ListEmpleosComponent,
    EstudiosComponent,
    ExperienciaLaboralComponent,
    PostulacionesComponent,
    ProfileCandidatoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NavbarModule,
    FormsModule
  ]
})
export class ProfileModule { }
