import { switchMap, filter, map, Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';

@Component({
  selector: 'app-header-choose-cart-modal',
  templateUrl: './header-choose-cart-modal.component.html',
  styleUrls: ['./header-choose-cart-modal.component.scss'],
})
export class HeaderChooseCartModalComponent implements OnInit {
  isGroupCart: boolean = false;
  isChooseAddCart: boolean = false;
  listGroupCart$!: Observable<any[]>;
  handleChooseCart(cartID: number) {
    this.router.navigate([`/cart/${cartID}`]);
    this.dialogRef.close();
  }
  handleChooseAddCart() {
    this.isChooseAddCart = true;
  }
  handleChooseDefaultCart() {
    this.router.navigate(['/cart']);
    this.dialogRef.close();
  }
  handleChooseGroupCart() {
    this.isGroupCart = true;
  }
  submitForm() {}
  cartForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
  });
  returnChooseCart() {
    this.isGroupCart = false;
  }
  returnAddCart() {
    this.isChooseAddCart = false;
  }
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
    this.listGroupCart$ = this.authService.dataUser$.pipe(
      switchMap((data) => this.cartService.readAllGroupCartOfUser(data?.id)),
      filter((cart) => !!cart),
      map((cart) => cart.DT)
    );
    this.listGroupCart$.subscribe((data) => {
      console.log(
        '🚀 ~ file: header-choose-cart-modal.component.ts:46 ~ HeaderChooseCartModalComponent ~ this.listGroupCart$.subscribe ~ data:',
        data
      );
    });
  }
}
