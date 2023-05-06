import { AuthService } from './../../data-access/auth.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  emailValidator,
  validateSamePassword,
} from 'src/app/shared/pipes/CustomValidate';
import { IResponse, IResponseToken } from 'src/app/shared/model/interface';
import { errorCode } from 'src/app/shared/model/model';
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[0-9]).+$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  formSubmit$ = new Subject();
  registerForm = this.fb.group(
    {
      email: ['', Validators.compose([Validators.required, emailValidator()])],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^[0-9]+$/),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
    },
    { validators: validateSamePassword('password', 'confirmPassword') }
  );

  getFormErrors(formGroup: FormGroup): string[] {
    const errors: any[] = [];
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        formGroup.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          if (key === 'email') {
            if (keyError === 'required') {
              errors.push({ key: key, error: 'Email is required!' });
            } else {
              errors.push({ key: key, error: controlErrors[keyError] });
            }
          } else if (key === 'phone') {
            if (keyError === 'required') {
              errors.push({ key: key, error: 'Phone is required!' });
            } else {
              errors.push({
                key: key,
                error:
                  'Your phone must be a number and greater than 10 characters!',
              });
            }
          } else if (key === 'password' || key === 'confirmPassword') {
            if (keyError === 'required') {
              errors.push({
                key: key,
                error: 'Password and confirm password is required!',
              });
            } else if (keyError === 'minlength') {
              errors.push({
                key: key,
                error: 'Your password must be greater than 8 characters!',
              });
            } else {
              errors.push({
                key: key,
                error:
                  'Your password must be have at least have 1 uppercase and 1 number!',
              });
            }
          }
          // errors.push(`${key} ${keyError}: ${controlErrors[keyError]}`);
        });
      }
    });
    return errors;
  }

  submitForm() {
    const formErrors = this.getFormErrors(this.registerForm);
    if (formErrors.length > 0) {
      formErrors.forEach((item: any) => {
        this._snackBar.open(item.error, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    } else if (this.registerForm.errors?.['passwordNotMatch']) {
      this._snackBar.open(
        'Your password not match confirm password!',
        'Close',
        {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        }
      );
    } else {
      const rawUserDataRegister = {
        email: this.registerForm.value['email'],
        username: this.registerForm.value['email'],
        phone: this.registerForm.value['phone'],
        password: this.registerForm.value['password'],
      };
      this.authService
        .registerUser(rawUserDataRegister)
        .subscribe((data: IResponse) => {
          this._snackBar.open(data.EM, 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          if (+data.EC === errorCode.SUCCESS) {
            const rawUserDataLogin = {
              username: this.registerForm.value['email'],
              password: this.registerForm.value['password'],
            };
            this.authService
              .loginUser(rawUserDataLogin)
              .subscribe((data: IResponseToken) => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                this.router.navigate(['home']);
              });
          }
        });
    }
  }

  // submitForm() {
  //   const formErrors = this.getFormErrors(this.registerForm);
  //   if (formErrors.length > 0) {
  //     formErrors.forEach((item: any) => {
  //       this.toastrService.error(item.error);
  //     });
  //   } else if (this.registerForm.errors?.['passwordNotMatch']) {
  //     this.toastrService.error('Your password not match confirm password!');
  //   }
  // }
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
}
