import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization'; 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {}

  //interecpta el token creado por el token-storage y agrega el parametro bearer + token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authreq = request;
    const token = this.token.getToken();

    if (token != null) {
      authreq = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }

    return next.handle(authreq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
