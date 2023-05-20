import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CartService } from '../../data-access/cart.service';
import { IResponse, IUser } from 'src/app/shared/model/interface';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartPageComponent implements OnInit {
  dataUser!: IUser;
  dataCarts!: any;
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data: IUser) => {
      this.dataUser = data;
      this.cartService
        .readCartDefault(data?.id)
        .subscribe((data: IResponse) => {
          this.dataCarts = data.DT;
          console.log(
            '🚀 ~ file: cart-page.component.ts:25 ~ CartPageComponent ~ .subscribe ~ data.DT:',
            data.DT
          );
        });
    });
  }
}
