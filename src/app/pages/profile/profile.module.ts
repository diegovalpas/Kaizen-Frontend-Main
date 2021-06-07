import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostulanteProfileComponent } from './postulante/postulante-profile.component';
import { ReclutadorProfileComponent } from './reclutador/reclutador-profile.component';
import { EstudiosComponent } from './postulante/estudios/estudios.component';
import { ExperienciaLaboralComponent } from './postulante/experiencia-laboral/experiencia-laboral.component';
import { PostulacionesComponent } from './postulante/postulaciones/postulaciones.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { PausedEmpleoComponent } from './reclutador/paused-empleo/paused-empleo.component';
import { ActiveEmpleoComponent } from './reclutador/active-empleo/active-empleo.component';
import { NoActiveEmpleoComponent } from './reclutador/no-active-empleo/no-active-empleo.component';
import { PublicarEmpleoComponent } from './reclutador/publicar-empleo/publicar-empleo.component';
import { ListaPostulantesComponent } from './reclutador/lista-postulantes/lista-postulantes.component';
import { ProfilePostulanteComponent } from './reclutador/profile-postulante/profile-postulante.component';
import { NavFooterModule } from '../nav-footer/nav-footer.module';


@NgModule({
  declarations: [
    PostulanteProfileComponent,
    ReclutadorProfileComponent,
    EstudiosComponent,
    ExperienciaLaboralComponent,
    PostulacionesComponent,
    PausedEmpleoComponent,
    ActiveEmpleoComponent,
    NoActiveEmpleoComponent,
    PublicarEmpleoComponent,
    ListaPostulantesComponent,
    ProfilePostulanteComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NavFooterModule
  ]
})
export class ProfileModule { }
