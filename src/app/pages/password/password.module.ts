import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PasswordComponent} from './password.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { PasswordupdateComponent } from './passwordupdate/passwordupdate.component';

@NgModule({
  declarations: [
    PasswordComponent,
    AutenticacionComponent,
    PasswordupdateComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ]
})
export class PasswordModule { }