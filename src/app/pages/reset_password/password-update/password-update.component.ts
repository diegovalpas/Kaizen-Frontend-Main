import { Component, OnInit } from '@angular/core';
import { PasswordUpdateService } from './password-update.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../tools/custom-validators';
import { PasswordUpdate } from './password-update-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
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
export class PasswordUpdateComponent implements OnInit {

  passwordupdateData: any = {};

  alert: any = {};

  errorMessage: any = {};

  token = localStorage.getItem('passwordresetToken');

  public passwordupdateForm = this.fb.group({
    contrasenia: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { passwordnumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, {passworduppercase: true}),
      CustomValidators.patternValidator(/[a-z]/, {passwordsmallcase: true}),
      CustomValidators.patternValidator(/[@#$:\^%&]/, {passwordspecialcharacter: true})
    ])),
    confirmcontrasenia: new FormControl('')
  }, { validator: CustomValidators.passwordMatchValidator("contrasenia", "confirmcontrasenia") })

  constructor(private passwordupdateService: PasswordUpdateService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {}

  PasswordUpdate(): any {
    var passwordUpdate: PasswordUpdate = {
      contrasenia: this.passwordupdateForm.controls['contrasenia'].value,
      token: this.token || ""
    }
    
    this.passwordupdateService.PasswordUpdate(passwordUpdate).subscribe(
      data => {
        console.log(data);
        localStorage.removeItem('passwordresetToken');
        window.location.href = '/';
      },

      err => {
        this.errorMessage = err.error.message;

        this.alert.type = 'invalid';
        this.alert.message = this.errorMessage;
      }
    )
  }
}
