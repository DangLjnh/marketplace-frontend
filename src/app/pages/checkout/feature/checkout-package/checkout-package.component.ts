import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { IUser } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-checkout-package',
  templateUrl: './checkout-package.component.html',
  styleUrls: ['./checkout-package.component.scss'],
})
export class CheckoutPackageComponent implements OnInit {
  @Input() dataCarts!: any;
  ngOnInit(): void {
    console.log(
      '🚀 ~ file: checkout-package.component.ts:14 ~ CheckoutPackageComponent ~ dataCarts:',
      this.dataCarts
    );
  }
}
