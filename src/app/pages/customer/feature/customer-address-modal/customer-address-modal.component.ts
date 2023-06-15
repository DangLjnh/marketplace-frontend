import { Component, Inject } from '@angular/core';
import { CustomerService } from '../../data-access/customer.service';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { IUser } from 'src/app/shared/model/interface';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { resetForm } from 'src/app/shared/utils/function';
import { ToastrService } from 'ngx-toastr';
import { errorCode } from 'src/app/shared/model/model';
@Component({
  selector: 'app-customer-address-modal',
  templateUrl: './customer-address-modal.component.html',
  styleUrls: ['./customer-address-modal.component.scss'],
})
export class CustomerAddressModalComponent {
  check: boolean = false;
  loading: boolean = false;
  dataUser!: IUser;
  dataAddress!: any;
  type!: string;
  cityCode!: number;
  addressID!: number;
  cities!: any[];
  districts!: any[];
  wards!: any[];

  addressForm = this.fb.group({
    fullName: ['', Validators.required],
    phone: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[0-9]+$/),
      ]),
    ],
    city: ['', Validators.required],
    district: ['', Validators.required],
    ward: ['', Validators.required],
    address: ['', Validators.required],
    isDefault: [false],
  });

  submitForm() {
    const formErrors = this.getFormErrors(this.addressForm);
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
      const rawAddressData = {
        id: this.addressID,
        userID: this.dataUser.id,
        full_name: this.addressForm.value.fullName,
        phone: this.addressForm.value.phone,
        city: this.addressForm.value.city,
        city_code: this.cityCode,
        district: this.addressForm.value.district,
        ward: this.addressForm.value.ward,
        address: this.addressForm.value.address,
        isDefault: this.addressForm.value.isDefault,
      };
      if (this.type === 'create') {
        this.customerService.createAddress(rawAddressData).subscribe((data) => {
          this.loading = false;
          if (
            +data.EC === errorCode.ERROR_PARAMS ||
            +data.EC === errorCode.ERROR_SERVER
          ) {
            this.toastrService.error(data.EM);
            return;
          }
          if (+data.EC === errorCode.SUCCESS) {
            this.toastrService.success(data.EM);
            // reset form with form builder
            resetForm(this.addressForm);
            this.customerService
              .readAddressOfUser(this.dataUser.id)
              .subscribe((data) => {
                this.customerService.listAddress = data.DT;
              });
          }
        });
      }
      if (this.type === 'edit') {
        this.customerService.updateAddress(rawAddressData).subscribe((data) => {
          this.loading = false;
          if (
            +data.EC === errorCode.ERROR_PARAMS ||
            +data.EC === errorCode.ERROR_SERVER
          ) {
            this.toastrService.error(data.EM);
            return;
          }
          if (+data.EC === errorCode.SUCCESS) {
            this.toastrService.success(data.EM);
            this.customerService
              .readAddressOfUser(this.dataUser.id)
              .subscribe((data) => {
                this.customerService.listAddress = data.DT;
                this.dialogRef.close();
              });
          }
        });
      }
    }
  }

  handleChooseCity(cityCode: number) {
    this.cityCode = cityCode;
    this.customerService.readDistrictOfCity(cityCode).subscribe((data) => {
      this.districts = data.districts;
      this.wards = [];
    });
    return this.customerService
      .readDistrictOfCity(cityCode)
      .pipe(map((data) => data.districts));
  }

  handleChooseDistrict(districtName: string | null | undefined) {
    [...this.districts].forEach((data) => {
      if (data.name === districtName) {
        this.wards = data.wards;
      }
    });
  }

  getFormErrors(formGroup: FormGroup): string[] {
    const errors: any[] = [];
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        formGroup.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          if (key === 'fullName') {
            errors.push({ key: key, error: 'Full name is required!' });
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
          } else if (key === 'city') {
            errors.push({ key: key, error: 'City is required!' });
          } else if (key === 'district') {
            errors.push({ key: key, error: 'District is required!' });
          } else if (key === 'ward') {
            errors.push({ key: key, error: 'Ward is required!' });
          } else if (key === 'address') {
            errors.push({ key: key, error: 'Street name is required!' });
          }
        });
      }
    });
    return errors;
  }

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.customerService.readAllCity().subscribe((data) => {
      this.cities = data;
    });
    this.authService.dataUser$.subscribe((data) => {
      this.dataUser = data;
    });
    const data = this.data;
    this.type = data.type;
    if (data.type === 'edit') {
      this.addressID = data.addressID;
      this.customerService.readAddressItem(data.addressID).subscribe((data) => {
        this.dataAddress = data.DT;
        console.log(
          '🚀 ~ file: customer-address-modal.component.ts:196 ~ CustomerAddressModalComponent ~ this.customerService.readAddressItem ~ dataAddress:',
          this.dataAddress
        );
        this.addressForm.patchValue({
          fullName: data.DT.Address_Detail?.full_name,
          phone: data.DT.Address_Detail?.phone,
          city: data.DT.Address_Detail?.city,
          address: data.DT.Address_Detail?.address,
          isDefault: data.DT.isDefault,
        });
        const dataDistricts$ = this.handleChooseCity(
          data.DT.Address_Detail?.city_code
        );
        dataDistricts$.subscribe(() => {
          this.addressForm.patchValue({
            district: data.DT.Address_Detail?.district,
            ward: data.DT.Address_Detail?.ward,
          });
          this.handleChooseDistrict(data.DT.Address_Detail?.district);
        });
      });
    }
  }
}
