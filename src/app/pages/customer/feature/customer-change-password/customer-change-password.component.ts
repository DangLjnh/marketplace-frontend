import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../data-access/customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { IUser } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-customer-change-password',
  templateUrl: './customer-change-password.component.html',
  styleUrls: ['./customer-change-password.component.scss'],
})
export class CustomerChangePasswordComponent implements OnInit {
  dataUser!: IUser;
  passwordForm = this.fb.group({
    current_password: ['', Validators.required],
    new_password: ['', Validators.required],
    confirm_password: ['', Validators.required],
  });
  submitForm() {
    const passwordRawData = {
      current_password: this.passwordForm.value.current_password,
      new_password: this.passwordForm.value.new_password,
      username: this.dataUser?.User_Detail?.email,
    };
    this.customerService.changePassword(passwordRawData).subscribe((data) => {
      if (+data.EC === 0) {
        this.toastrService.success(data.EM);
      } else {
        this.toastrService.error(data.EM);
      }
    });
  }
  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((item) => {
      this.dataUser = item;
    });
  }
}
