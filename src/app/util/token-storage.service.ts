import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const JOB_KEY = 'idPuesto';
const LOOKFOR_KEY = 'busqueda'


@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
 

  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  //guarda token
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  };

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  };

  public saveTokenjob(token: string): void {
    window.localStorage.removeItem(JOB_KEY);
    window.localStorage.setItem(JOB_KEY, token);
  };

  public getTokenjob(): string | null {
    return window.localStorage.getItem(JOB_KEY);
  };

  public saveTokenBusqueda(dato: any): void {
    window.localStorage.removeItem(LOOKFOR_KEY);
    window.localStorage.setItem(LOOKFOR_KEY, JSON.stringify(dato));
  };
  
  public getTokenBusqueda(): any {
    const dato = window.localStorage.getItem(LOOKFOR_KEY);
    if (dato){
      return JSON.parse(dato);
    }
  };

  public deleteTokenBusqueda(): any {
    window.localStorage.removeItem(LOOKFOR_KEY);
  }

  //guarda usuario con token
  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  //obtiene usuario con token
  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
