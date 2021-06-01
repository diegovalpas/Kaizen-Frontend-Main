import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  //private BASE_URL = 'http://localhost:8080';
  private BASE_URL = 'https://backend-kaizentalent.herokuapp.com';

  constructor(private http: HttpClient) { }

  getArchivocvFile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/cvfiles`);
  }

  getFotoFile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/photos`);
  }

  getLogoFile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/logos`);
  }
}
