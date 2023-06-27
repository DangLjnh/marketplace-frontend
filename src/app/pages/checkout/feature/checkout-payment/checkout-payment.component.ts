import { Component } from '@angular/core';
import { CheckoutService } from '../../data-access/checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent {
  arrPay = [
    {
      id: 1,
      url: 'https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png',
      content: 'Thanh toán khi nhận hàng',
      value: 'cash',
    },
    {
      id: 2,
      url: 'https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg',
      content: 'Thanh toán bằng Momo',
      value: 'momo',
    },
    // {
    //   id: 3,
    //   url: 'https://freepngimg.com/save/13625-paypal-logo-transparent-png/1817x1266',
    //   content: 'Payment by Paypal',
    // },
  ];
  onRadioChange(event: any) {
    const selectedValue = event.value;
    this.checkoutService.choosePayment = selectedValue;
    // Do something with the selected value
  }
  constructor(private checkoutService: CheckoutService) {}
}
