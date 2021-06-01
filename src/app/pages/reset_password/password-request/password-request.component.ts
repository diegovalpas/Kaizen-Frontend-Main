import { Component, OnInit } from '@angular/core';
import { PasswordRequestService } from './password-request.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordRequest } from './password-request-interface';

@Component({
  selector: 'app-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: [],
  styles: [
    `
    :host >>> .alert-invalid {
      color: #ffffff;
      background-color: #dc3545;
      border-color: #dc3545;
      text-align: justify;
    }
  `
  ]
})

export class PasswordRequestComponent implements OnInit {

  passwordrequestData: any = {};
  
  errorMessage = '';

  alert: any = {};

  public passwordrequestForm = this.fb.group({
    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ]))
  })

  constructor(private passwordrequestService: PasswordRequestService,
              private fb: FormBuilder) { }

  ngOnInit(): void {}

  PasswordResetRequest(): void{
    var passwordRequest: PasswordRequest = {

      emailUsuario: this.passwordrequestForm.controls['emailUsuario'].value
    }

    this.passwordrequestService.PasswordRequest(passwordRequest).subscribe(
      data => {
        this.passwordrequestData = data;
        localStorage.setItem('passwordresetToken', this.passwordrequestData.passwordresetToken);
        console.log(this.passwordrequestData);

        this.alert.type = 'valid';
        this.alert.message = this.passwordrequestData.passwordresetMessage;
      },

      err => {
        this.errorMessage = err.error.message;

        this.alert.type = 'invalid';
        this.alert.message = this.errorMessage;
      }
    )
  }
}
