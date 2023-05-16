import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { IUser } from 'src/app/shared/model/interface';
import { toBase64 } from 'src/app/shared/utils/function';
import { ProductService } from '../../data-access/product.service';

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.scss'],
})
export class SellerProductComponent implements OnInit {
  listImage: any[] = [];
  listBase64: string[] = [];
  dataUser!: IUser;
  list = [
    {
      name: 'Thông tin cơ bản',
    },
    {
      name: 'Thông tin chi tiết',
    },
    {
      name: 'Thông tin bán hàng',
    },
  ];

  submitForm() {
    const formValue = this.productForm.value;
    const formData = new FormData();
    const dataToPersist = {
      shopID: this.dataUser.Shop.id,
      categoryFilterID: 1,
      name: formValue.name,
      desc: formValue.desc,
      price_original: formValue.price_original,
      width: formValue.width,
      height: formValue.height,
      length: formValue.length,
      weight: formValue.weight,
    };
    for (let i = 0; i < this.listImage.length; i++) {
      formData.append('file', this.listImage[i]);
    }
    formData.append('data', JSON.stringify(dataToPersist));
    this.productService.createShop(formData).subscribe((data) => {
      if (+data.EC === 1 || +data.EC === -1) {
        this.toastrService.error(data.EM);
      }
      if (+data.EC === 0) {
        this.toastrService.success(data.EM);
      }
    });
  }

  async handleChangeImageProduct(e: any) {
    if (this.listImage.length < 5) {
      let strToReplace = await toBase64(e.target.files[0]);
      this.listImage.push(e.target.files[0]);
      this.listBase64.push(
        String(strToReplace)?.replace(/^data:image\/[a-z]+;base64/, '')
      );
    }
  }

  productForm = this.fb.group({
    name: [''],
    category: [''],
    desc: [''],
    price_original: [''],
    quantity: [''],
    weight: [''],
    length: [''],
    width: [''],
    height: [''],
  });
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data: any) => {
      this.dataUser = data;
      console.log(
        '🚀 ~ file: seller-product.component.ts:64 ~ SellerProductComponent ~ this.authService.dataUser$.subscribe ~ data:',
        data
      );
    });
  }
}
