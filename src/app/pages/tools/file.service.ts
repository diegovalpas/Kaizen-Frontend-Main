import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private BaseUrl = 'https://backend-kaizentalent.herokuapp.com';

  constructor(private http: HttpClient) { }

  getArchivocvFile(): Observable<any> {
    return this.http.get(`${this.BaseUrl}/cvfiles`);
  }

  getFotoFile(): Observable<any> {
    return this.http.get(`${this.BaseUrl}/photos`);
  }

  getLogoFile(): Observable<any> {
    return this.http.get(`${this.BaseUrl}/logos`);
  }
}
