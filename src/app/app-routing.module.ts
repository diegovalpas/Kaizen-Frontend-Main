import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulanteSigninComponent } from './pages/signin/postulante/postulante-signin.component';
import { ReclutadorSigninComponent } from './pages/signin/reclutador/reclutador-signin.component';
import { PostulanteSignupComponent } from './pages/signup/postulante/postulante-signup.component';
import { ReclutadorSignupComponent } from './pages/signup/reclutador/reclutador-signup.component';
import { IndexComponent } from './pages/index/index.component';
import { ReclutadorProfileComponent } from './pages/profile/reclutador/reclutador-profile.component';
import { PostulanteProfileComponent } from './pages/profile/postulante/postulante-profile.component';
import { PasswordRequestComponent } from './pages/reset_password/password-request/password-request.component';
import { PasswordUpdateComponent } from './pages/reset_password/password-update/password-update.component';

import { EmpleoDetailComponent } from './pages/empleo-detail/empleo-detail.component'
import { ListaTrabajosComponent } from './pages/lista-trabajos/lista-trabajos.component';
import { PostulacionesComponent } from './pages/profile/postulante/postulaciones/postulaciones.component';
import { PublicarEmpleoComponent } from './pages/profile/reclutador/publicar-empleo/publicar-empleo.component';
import { ListaPostulantesComponent } from './pages/profile/reclutador/lista-postulantes/lista-postulantes.component';
import { ProfilePostulanteComponent } from './pages/profile/reclutador/profile-postulante/profile-postulante.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component'
import { ActiveEmpleoComponent } from './pages/profile/reclutador/active-empleo/active-empleo.component';




const routes: Routes = [
  { path: 'signin/postulante', component: PostulanteSigninComponent, data: { title: 'Iniciar Sesión – Kaizen Talent' } },
  { path: 'signin/reclutador', component: ReclutadorSigninComponent, data: { title: 'Iniciar Sesión  Reclutador – Kaizen Talent' } },
  { path: 'signup/postulante', component: PostulanteSignupComponent, data: { title: 'Regístrate | Kaizen Talent' } },
  { path: 'signup/reclutador', component: ReclutadorSignupComponent, data: { title: 'Registro Reclutador | Kaizen Talent' } },
  { path: 'reclutador/:idReclutador/profile', component: ReclutadorProfileComponent, data: { title: 'Mi Perfil | Kaizen Talent' } },
  { path: 'postulante/:idPostulante/profile', component: PostulanteProfileComponent, data: { title: 'Mi Perfil | Kaizen Talent' } },
  { path: '', component: IndexComponent, data: { title: 'Kaizen Talent' }},
  { path: 'index', component: IndexComponent, data: { title: 'Kaizen Talent' }},
  { path: 'password/request', component: PasswordRequestComponent, data: {title: 'Recupera tu contraseña - Kaizen Talent '}},
  { path: 'password/update', component: PasswordUpdateComponent },
  { path: 'puestotrabajo/:idPuestoTrabajo/detail', component:EmpleoDetailComponent},
  { path: 'home/show/all', component:ListaTrabajosComponent },
  { path: 'postulante/:idPostulante/postulaciones', component:PostulacionesComponent},
  { path: 'reclutador/:idReclutador/publicar', component:PublicarEmpleoComponent},
  { path: 'listacandidatos', component:ListaPostulantesComponent},
  { path: 'perfilcandidato', component:ProfilePostulanteComponent},
  { path: 'postulante/:idReclutador/publicaciones', component:ActiveEmpleoComponent},
  { path: 'contactanos', component:ContactanosComponent }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

