import { Component, OnInit } from '@angular/core';
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
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { IUser } from 'src/app/shared/model/interface';
import { emailValidator } from 'src/app/shared/pipes/CustomValidate';
import { toBase64 } from 'src/app/shared/utils/function';
import { CustomerService } from '../../data-access/customer.service';
@Component({
  selector: 'app-customer-edit-page',
  templateUrl: './customer-edit-page.component.html',
  styleUrls: ['./customer-edit-page.component.scss'],
})
export class CustomerEditPageComponent implements OnInit {
  dataUser!: IUser;
  base64Image!: string;
  fileImage!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  editUserForm = this.fb.group({
    fullName: [''],
    email: ['', Validators.compose([emailValidator()])],
    phone: [
      '',
      Validators.compose([
        Validators.minLength(10),
        Validators.pattern(/^[0-9]+$/),
      ]),
    ],
    sex: [''],
  });

  async handleChangeFile(e: any) {
    if (e.target && e.target.files[0]) {
      let strToReplace = await toBase64(e.target.files[0]);
      this.base64Image = String(strToReplace)?.replace(
        /^data:image\/[a-z]+;base64/,
        ''
      );
      this.fileImage = e.target.files[0];
    }
  }

  submitForm() {
    const formErrors = this.getFormErrors(this.editUserForm);
    const formValue = this.editUserForm.value;
    if (formErrors.length > 0 && formValue.email !== '') {
      formErrors.forEach((item: any) => {
        this._snackBar.open(item.error, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    } else {
      const formData = new FormData();
      const data: any = {
        id: this.dataUser.id,
      };
      if (formValue.email !== '') {
        data.email = formValue.email;
      }
      if (formValue.phone !== '') {
        data.phone = formValue.phone;
      }
      if (formValue.fullName !== '') {
        data.fullName = formValue.fullName;
      }
      if (formValue.sex !== '') {
        data.sex = formValue.sex;
      }
      formData.append('file', this.fileImage);
      formData.append('data', JSON.stringify(data));
      this.customerService.updateUser(formData).subscribe((data) => {
        if (data) {
          this.authService.accountUser().subscribe((dataUser: any) => {
            this.authService.dataUser = dataUser.DT;
            this._snackBar.open(data.EM, 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          });
        }
      });
    }
  }

  getFormErrors(formGroup: FormGroup): string[] {
    const errors: any[] = [];
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        formGroup.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          if (key === 'email') {
            errors.push({ key: key, error: controlErrors[keyError] });
          } else if (key === 'phone') {
            errors.push({
              key: key,
              error:
                'Your phone must be a number and greater than 10 characters!',
            });
          }
        });
      }
    });
    return errors;
  }

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data: any) => {
      this.dataUser = data;
      this.editUserForm.patchValue({
        fullName: this.dataUser.User_Detail.full_name,
        email: this.dataUser.User_Detail.email,
        phone: this.dataUser.phone,
        sex: this.dataUser.User_Detail.sex,
        // update other form controls here
      });
    });
  }
}
