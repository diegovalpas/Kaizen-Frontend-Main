import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export class CustomValidators {

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null!;
            }

            const valid = regex.test(control.value);

            return valid ? null! : error;
        };
    }

    static passwordMatchValidator(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
          const passwordControl = formGroup.controls[password];
          const confirmPasswordControl = formGroup.controls[confirmPassword];
    
          if (!passwordControl || !confirmPasswordControl) {
            return null;
          }
    
          if (
            confirmPasswordControl.errors &&
            !confirmPasswordControl.errors.passwordMismatch
          ) {
            return null;
          }
    
          if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ passwordMismatch: true });
              return true;
          } else {
            confirmPasswordControl.setErrors(null);
              return null;
          }
        };
      }
}

