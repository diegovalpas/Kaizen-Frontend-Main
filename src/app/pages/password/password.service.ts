import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

//const baseUrl = 'http://localhost:8080/api/forgotpassword/sendemail';
const baseUrl = 'https://backend-kaizentalent.herokuapp.com/api/forgotpassword/sendemail';

//const AutUrl = "http://localhost:8080/api/reset_password";
const AutUrl = "https://backend-kaizentalent.herokuapp.com/api/reset_password";

//const updUrl = "http://localhost:8080/api/forgotpassword/update";
const updUrl = "https://backend-kaizentalent.herokuapp.com/api/forgotpassword/update";

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http:HttpClient) { }
  
  getEmail(email: any): Observable<any> {

    var emailPostulante: FormData = new FormData();

    emailPostulante.append('emailusuario', email);

    return this.http.post(
      baseUrl,
      emailPostulante
    );
  }

  getPagina(token:any): Observable<any> {

    var newtoken: FormData = new FormData();
    newtoken.append('token', token);

    return this.http.get(`${AutUrl}/${newtoken}`);
  }


  updatePassword(newtoken:any,password:any){
    
    
    var changepass: FormData = new FormData();
    changepass.append('contraseña',password),
    changepass.append('token',newtoken)

    return this.http.put(updUrl, changepass)
  }
}
