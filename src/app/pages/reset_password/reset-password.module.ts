import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordRequestComponent } from './password-request/password-request.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PasswordRequestComponent,
    PasswordUpdateComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ResetPasswordModule { }
