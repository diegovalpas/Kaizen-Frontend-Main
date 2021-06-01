import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninModule } from './pages/signin/signin.module';
import { SignupModule } from './pages/signup/signup.module';
import { authInterceptorProviders } from './util/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProfileModule } from './pages/profile/profile.module';
import { ResetPasswordModule } from './pages/reset_password/reset-password.module';
import { EmpleoDetailModule } from './pages/empleo-detail/empleo-detail.module';
import { IndexModule } from './pages/index/index.module';
import { NavbarModule } from './pages/nav-bars/nav-bars.module';
import { ListaTrabajosModule } from './pages/lista-trabajos/lista-trabajos.module';

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
    ProfileModule,
    IndexModule,
    NavbarModule,
    ListaTrabajosModule,
    EmpleoDetailModule,
    ResetPasswordModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
