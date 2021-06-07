import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

//Datos guardados en LocalStorage
const LOOKFOR_KEY = 'auth-filter';
const JOB_KEY = 'auth-job';
const EXP_KEY = 'auth-exp';
const EDU_KEY = 'auth-edu'
const PROFILE_KEY = 'auth-profile'

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

   //Obtiene el dato de la experiencia
   public saveExp(exp: string): void {
    window.localStorage.removeItem(EXP_KEY);
    window.localStorage.setItem(EXP_KEY, exp);
  }

  public getExp(): string | null {
    return window.localStorage.getItem(EXP_KEY);
  }

  //Obtiene el dato de educacion
  public saveEdu(edu: string): void {
    window.localStorage.removeItem(EDU_KEY);
    window.localStorage.setItem(EDU_KEY, edu);
  }

  public getEdu(): string | null {
    return window.localStorage.getItem(EDU_KEY);
  }

  //Filtrar informacion
  public saveTokenBusqueda(dato: any): void {
    window.localStorage.removeItem(LOOKFOR_KEY);
    window.localStorage.setItem(LOOKFOR_KEY, JSON.stringify(dato));
  }
  
  public getTokenBusqueda(): any {
    const dato = window.localStorage.getItem(LOOKFOR_KEY);
    if (dato){
      return JSON.parse(dato);
    }
  }

  public deleteTokenBusqueda(): any {
    window.localStorage.removeItem(LOOKFOR_KEY);
  }

  //obtiene el dato del puesto de empleo
  public saveTokenjob(token: string): void {
    window.localStorage.removeItem(JOB_KEY);
    window.localStorage.setItem(JOB_KEY, token);
  }

  public getTokenjob(): string | null {
    return window.localStorage.getItem(JOB_KEY);
  }

  //obtiene los datos BasicInfo del perfil
  public saveUsuarioPerfil(token: string): void {
    window.localStorage.removeItem(PROFILE_KEY);
    window.localStorage.setItem(PROFILE_KEY, token);
  }
  
  public getUsuarioPerfil(): string | null {
    return window.localStorage.getItem(PROFILE_KEY);
  }


}
