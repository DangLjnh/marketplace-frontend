import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { IUser } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent {
  dataCarts!: any;
  subtotal: number = 0;
  totalDiscount: number = 0;
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private toastService: ToastrService
  ) {}
  ngOnInit(): void {
    this.cartService.listCheckCart$.subscribe((data) => {
      this.dataCarts = data;
    });
  }
}
