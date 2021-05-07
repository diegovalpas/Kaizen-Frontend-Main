import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninModule } from './pages/signin/signin.module';
import { SignupModule } from './pages/signup/signup.module';
import { LoginModule } from './pages/login/login.module';

import { authInterceptorProviders } from './util/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PasswordModule } from './pages/password/password.module';

import { PuestodetrabajoModule } from './pages/puestodetrabajo/puestodetrabajo.module'

import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [
    AppComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SigninModule,
    SignupModule,
    LoginModule,
    NgbModule,
    PasswordModule,
    PuestodetrabajoModule,
    NgxPaginationModule
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
