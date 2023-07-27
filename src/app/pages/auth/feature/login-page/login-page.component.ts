import { errorCode } from 'src/app/shared/model/model';
import { statusUser } from './../../../../shared/model/model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hide = true;
  loading = false;
  loginForm = this.fb.group({
    username: ['', Validators.compose([Validators.required])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
  });

  submitForm() {
    const rawUserDataLogin = {
      username: this.loginForm.value['username'],
      password: this.loginForm.value['password'],
    };
    this.authService.loginUser(rawUserDataLogin).subscribe({
      next: (data: any) => {
        if (rawUserDataLogin.username === 'admin') {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          this.authService.accountUser().subscribe((data: any) => {
            this.loading = false;
            if (data.EC === errorCode.ERROR_PARAMS) {
              this.toastrService.error(data.EM);
              return;
            }
            if (data.EC === errorCode.SUCCESS) {
              this.loading = false;
              this.authService.dataUser = data.DT;
              this.router.navigate(['admin/portal/user']);
            }
          });
        } else {
          const formErrors = this.getFormErrors(this.loginForm);
          if (formErrors.length > 0) {
            for (let i = 0; i < formErrors.length; i++) {
              const item: any = formErrors[i];
              this.toastrService.error(item.error);
              if (item) {
                break;
              }
            }
          } else {
            this.loading = true;
            const rawUserDataLogin = {
              username: this.loginForm.value['username'],
              password: this.loginForm.value['password'],
            };
            this.authService.loginUser(rawUserDataLogin).subscribe({
              next: (data: any) => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                this.authService.accountUser().subscribe((data: any) => {
                  this.loading = false;
                  if (data.EC === errorCode.ERROR_PARAMS) {
                    this.toastrService.error(data.EM);
                    return;
                  }
                  if (data.EC === errorCode.SUCCESS) {
                    this.loading = false;
                    this.authService.dataUser = data.DT;
                    this.router.navigate(['home']);
                  }
                });
              },
              error: (err) => {
                this.loading = false;
                this.toastrService.error(err.error);
              },
            });
          }
        }
      },
      error: (err) => {
        this.loading = false;
        this.toastrService.error(err.error);
      },
    });
  }
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
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {}
}
