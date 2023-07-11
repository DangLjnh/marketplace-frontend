import { switchMap, filter, map, Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { IUser } from 'src/app/shared/model/interface';
import { errorCode } from 'src/app/shared/model/model';

@Component({
  selector: 'app-header-choose-cart-modal',
  templateUrl: './header-choose-cart-modal.component.html',
  styleUrls: ['./header-choose-cart-modal.component.scss'],
})
export class HeaderChooseCartModalComponent implements OnInit {
  dataUser!: IUser;
  isGroupCart: boolean = false;
  isChooseAddCart: boolean = false;
  listGroupCart$!: Observable<any[]>;
  handleChooseCart(cartID: number) {
    this.router.navigate([`/cart/${cartID}`]);
    this.dialogRef.close();
  }
  handleChooseDefaultCart() {
    this.router.navigate(['/cart']);
    this.dialogRef.close();
  }
  handleChooseAddCart() {
    this.isChooseAddCart = true;
  }
  handleChooseGroupCart() {
    this.listGroupCart$.subscribe((data) => {
      if (data.length > 0) {
        this.isGroupCart = true;
      } else {
        this.isGroupCart = true;
        this.isChooseAddCart = true;
      }
    });
  }
  returnChooseCart() {
    this.isGroupCart = false;
  }
  returnAddCart() {
    this.listGroupCart$.subscribe((data) => {
      if (data.length > 0) {
        this.isGroupCart = false;
      } else {
        this.isGroupCart = false;
        this.isChooseAddCart = false;
      }
    });
  }
  submitForm() {
    const rawDataCart = {
      cartID: Number(this.cartForm.value.cartID),
      userID: this.dataUser.id,
    };
    this.cartService.addUserToGroupCart(rawDataCart).subscribe((data) => {
      if (+data.EC === errorCode.SUCCESS) {
        this.toastrService.success(data.EM);
        this.router.navigate(['/cart/' + rawDataCart.cartID]);
        this.dialogRef.close();
      } else {
        this.toastrService.error(data.EM);
      }
    });
  }
  cartForm = this.fb.group({
    cartID: ['', Validators.compose([Validators.required])],
  });
  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService,
    private cartService: CartService,
    public dialogRef: MatDialogRef<HeaderChooseCartModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data) => {
      this.dataUser = data;
    });
    this.listGroupCart$ = this.authService.dataUser$.pipe(
      switchMap((data) => this.cartService.readAllGroupCartOfUser(data?.id)),
      filter((cart) => !!cart),
      map((cart) => cart.DT)
    );
  }
}
