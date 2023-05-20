import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-hint-total',
  templateUrl: './seller-hint-total.component.html',
  styleUrls: ['./seller-hint-total.component.scss'],
})
export class SellerHintTotalComponent {
  @Input() focusInput!: string;
}
