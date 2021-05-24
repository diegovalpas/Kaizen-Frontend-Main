import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/forgotpassword/sendemail';
const AutUrl = "https://backend-kaizentalent.herokuapp.com/api/reset_password"
const updUrl = "https://backend-kaizentalent.herokuapp.com/api/forgotpassword/update"

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http:HttpClient) { }
  
  getEmail(email: any): Observable<any> {
    
    return this.http.post(
      baseUrl,
      email,
      httpOptions
    );
  }

  getPagina(token:any): Observable<any> {

    var newtoken: FormData = new FormData();
    newtoken.append('token', token);

    return this.http.get(`${AutUrl}/${newtoken}`);
  }


  updatePassword(password:any){
    
    return this.http.put(updUrl, password,httpOptions);
  }
}
