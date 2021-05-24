import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulanteSigninComponent } from './pages/signin/postulante/postulante-signin.component';
import { ReclutadorSigninComponent } from './pages/signin/reclutador/reclutador-signin.component';
import { PostulanteSignupComponent } from './pages/signup/postulante/postulante-signup.component';
import { ReclutadorSignupComponent } from './pages/signup/reclutador/reclutador-signup.component';
import { PostulanteComponent} from './pages/login/postulante/postulante.component';
import { ReclutadorComponent } from './pages/login/reclutador/reclutador.component';
import { PasswordComponent} from './pages/password/password.component';
import { PasswordupdateComponent} from './pages/password/passwordupdate/passwordupdate.component'
import { AutenticacionComponent } from './pages/password/autenticacion/autenticacion.component';
import { PostulacionComponent } from './pages/puestodetrabajo/postulacion/postulacion.component';
import { PublicacionComponent} from './pages/puestodetrabajo/publicacion/publicacion.component';
import { ListaTrabajosComponent } from './pages/puestodetrabajo/lista-trabajos/lista-trabajos.component';
import { HomeComponent } from './pages/puestodetrabajo/home/home.component';
import {DetalletrabajoComponent} from './pages/puestodetrabajo/detalletrabajo/detalletrabajo.component'
import {ListacandidatosComponent} from './pages/puestodetrabajo/listacandidatos/listacandidatos.component'
import { ProfileComponent } from './pages/puestodetrabajo/profile/profile.component';
 
const routes: Routes = [
  { path: 'signin/postulante', component: PostulanteSigninComponent},
  { path: 'signin/reclutador', component: ReclutadorSigninComponent},
  { path: 'signup/postulante', component: PostulanteSignupComponent},
  { path: 'signup/reclutador', component: ReclutadorSignupComponent},
  { path: 'login/postulante/:idPostulante/profile/basicinfo', component:PostulanteComponent},
  { path: 'login/reclutador/:idReclutador/profile/basicinfo', component:ReclutadorComponent},
  { path: 'password', component:PasswordComponent},
  { path: 'api/reset_password/:newtoken', component:AutenticacionComponent},
  { path: 'usuario/password/update', component:PasswordupdateComponent},
  { path: 'reclutador/:idReclutador/publicar', component:PublicacionComponent},
  { path: 'postulante/:idPostulante/postulaciones', component:PostulacionComponent},
  { path: 'postulante/home/show/all', component:ListaTrabajosComponent},
  { path: 'index', component:HomeComponent},
  { path: 'puestotrabajo/:idPuestoTrabajo/detail', component:DetalletrabajoComponent},
  { path: 'listacandidatos', component:ListacandidatosComponent},
  { path: 'perfilcandidato', component:ProfileComponent},
  {path: '', redirectTo:'index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

