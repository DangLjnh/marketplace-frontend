import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CustomerService } from 'src/app/pages/customer/data-access/customer.service';
import { IUser } from 'src/app/shared/model/interface';
import { toBase64 } from 'src/app/shared/utils/function';
import { SellerService } from '../../../data-access/seller.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-seller-portal-form',
  templateUrl: './seller-portal-form.component.html',
  styleUrls: ['./seller-portal-form.component.scss'],
})
export class SellerPortalFormComponent implements OnInit {
  loading: boolean = false;
  cities$!: Observable<any>;
  districts$!: Observable<any>;
  wards!: any[];
  cityCode!: number;
  dataUser!: IUser;
  base64Image!: string;
  fileImage!: File;

  submitForm() {
    const formErrors = this.getFormErrors(this.shopForm);
    const formValue = this.shopForm.value;
    if (!this.fileImage) {
      this.toastrService.error('Bạn phải chọn ảnh đại diện!');
    } else if (formErrors.length > 0) {
      for (let i = 0; i < formErrors.length; i++) {
        const item: any = formErrors[i];
        this.toastrService.error(item.error);
        if (item) {
          break;
        }
      }
    } else {
      this.loading = true;
      const formData = new FormData();
      const rawData = {
        ...formValue,
        email: this.dataUser.User_Detail.email,
        phone: this.dataUser.phone,
        userID: this.dataUser.id,
      };
      formData.append('file', this.fileImage);
      formData.append('data', JSON.stringify(rawData));
      this.sellerService.createShop(formData).subscribe((data) => {
        if (+data.EC === 1 || +data.EC === -1) {
          this.toastrService.error(data.EM);
        } else {
          this.authService.dataUser$.subscribe((data: IUser) => {
            this.loading = false;
            this.dataUser = data;
            window.location.href = `${environment.frontendUrl}/seller`;
          });
        }
      });
    }
  }
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
  handleChooseCity(cityCode: number) {
    this.cityCode = cityCode;
    this.wards = [];
    this.districts$ = this.customerService
      .readDistrictOfCity(cityCode)
      .pipe(map((data) => data.districts));
    return this.customerService
      .readDistrictOfCity(cityCode)
      .pipe(map((data) => data.districts));
  }
  handleChooseDistrict(districtName: string) {
    this.districts$
      .pipe(
        map((data: any) =>
          data.find((district: any) => district.name === districtName)
        ),
        tap((district: any) => {
          this.wards = district.wards;
        })
      )
      .subscribe();

    // [...this.districts].forEach((data) => {
    //   if (data.name === districtName) {
    //     this.wards = data.wards;
    //   }
    // });
  }
  shopForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    email: [{ value: '', disabled: true }, Validators.required],
    phone: [
      { value: '', disabled: true },
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[0-9]+$/),
      ]),
    ],
    slug: ['', Validators.required],
    city: ['', Validators.required],
    district: ['', Validators.required],
    ward: ['', Validators.required],
    address: ['', Validators.required],
  });
  getFormErrors(formGroup: FormGroup): string[] {
    const errors: any[] = [];
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        formGroup.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          if (key === 'name') {
            if (keyError === 'required') {
              errors.push({ key: key, error: 'Tên shop không được để trống!' });
            } else {
              errors.push({
                key: key,
                error: 'Tên shop không vượt quá 30 ký tự!',
              });
            }
          } else if (key === 'phone') {
            if (keyError === 'required') {
              errors.push({
                key: key,
                error: 'Số điện thoại không được để trống!',
              });
            } else {
              errors.push({
                key: key,
                error: 'Số điện thoại của bạn phải là số và trên 10 ký tự',
              });
            }
          } else if (key === 'slug') {
            errors.push({ key: key, error: 'username không được để trống' });
          } else if (key === 'city') {
            errors.push({ key: key, error: 'Thành phố không được để trống!' });
          } else if (key === 'district') {
            errors.push({ key: key, error: 'Quận không được để trống!' });
          } else if (key === 'ward') {
            errors.push({ key: key, error: 'Phường không được để trống!' });
          } else if (key === 'address') {
            errors.push({ key: key, error: 'Số nhà không được để trống!' });
          }
        });
      }
    });
    return errors;
  }
  constructor(
    private customerService: CustomerService,
    private sellerService: SellerService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cities$ = this.customerService.readAllCity();
    this.authService.dataUser$.subscribe((data: IUser) => {
      // this.authService.dataUser = data;
      this.dataUser = data;
      this.shopForm.patchValue({
        phone: data.phone,
        email: data.User_Detail?.email,
      });
    });
  }
}
