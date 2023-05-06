import { Component } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import {
  IResponseToken,
  ILogin,
  IResponse,
} from 'src/app/shared/model/interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loginForm = this.fb.group({
    username: ['', Validators.compose([Validators.required])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
  });

  getFormErrors(formGroup: FormGroup): string[] {
    const errors: any[] = [];
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        formGroup.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          if (key === 'password') {
            if (keyError === 'required') {
              errors.push({
                key: key,
                error: 'Password is required!',
              });
            } else if (keyError === 'minlength') {
              errors.push({
                key: key,
                error: 'Your password must be greater than 8 characters!',
              });
            }
          } else {
            if (keyError === 'required') {
              errors.push({
                key: key,
                error: 'Username is required!',
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
    const formErrors = this.getFormErrors(this.loginForm);
    if (formErrors.length > 0) {
      formErrors.forEach((item: any) => {
        this._snackBar.open(item.error, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    } else {
      const rawUserDataLogin = {
        username: this.loginForm.value['username'],
        password: this.loginForm.value['password'],
      };

      this.authService.loginUser(rawUserDataLogin).subscribe({
        next: (data) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          this.authService.accountUser().subscribe((data: any) => {
            this.authService.dataUser = data.DT;
            this.router.navigate(['home']);
          });
        },
        error: (err) => {
          this._snackBar.open(err.error, 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      });
    }
  }
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
}
