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
import { EmpleoDetailComponent } from './pages/empleo-detail/empleo-detail.component';
import { ListaTrabajosComponent } from './pages/lista-trabajos/lista-trabajos.component';
import { PostempleoComponent } from './pages/profile/reclutador/postempleo/postempleo.component';
import { ListCandidatosComponent } from './pages/profile/reclutador/list-candidatos/list-candidatos.component';
import { PostulacionesComponent } from './pages/profile/postulante/postulaciones/postulaciones.component';

const routes: Routes = [
  { path: 'signin/postulante', component: PostulanteSigninComponent, data: { title: 'Iniciar Sesión – Kaizen Talent' } },
  { path: 'signin/reclutador', component: ReclutadorSigninComponent, data: { title: 'Iniciar Sesión  Reclutador – Kaizen Talent' } },
  { path: 'signup/postulante', component: PostulanteSignupComponent, data: { title: 'Regístrate | Kaizen Talent' } },
  { path: 'signup/reclutador', component: ReclutadorSignupComponent, data: { title: 'Registro Reclutador | Kaizen Talent' } },
  { path: 'reclutador/:idReclutador/profile', component: ReclutadorProfileComponent, data: { title: 'Mi Perfil | Kaizen Talent' } },
  { path: 'postulante/:idPostulante/profile', component: PostulanteProfileComponent, data: { title: 'Mi Perfil | Kaizen Talent' } },
  { path: '', component: IndexComponent, data: { title: 'Kaizen Talent' }},
  { path: 'index', component: IndexComponent, data: { title: 'Kaizen Talent' }},
  { path: 'puestotrabajo/:idPuestoTrabajo/detail', component:EmpleoDetailComponent},
  { path: 'password/update', component: PasswordUpdateComponent },
  { path: 'home/show/all', component:ListaTrabajosComponent },
  { path: 'candidatos', component:ListCandidatosComponent},
  { path: 'postulante/:idPostulante/postulaciones', component:PostulacionesComponent},
  { path: 'reclutador/:idReclutador/publicar', component:PostempleoComponent },
  { path: 'password/request', component: PasswordRequestComponent, data: {title: 'Recupera tu contraseña - Kaizen Talent '}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

