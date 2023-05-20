import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-hint',
  templateUrl: './seller-hint.component.html',
  styleUrls: ['./seller-hint.component.scss'],
})
export class SellerHintComponent {
  @Input() title!: string;
}
