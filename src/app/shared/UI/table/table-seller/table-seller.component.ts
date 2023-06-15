import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-seller',
  templateUrl: './table-seller.component.html',
  styleUrls: ['./table-seller.component.scss'],
})
export class TableSellerComponent {
  @Input() navTabs!: any[];
  @Input() titleAddNew!: string;
  @Input() countItem!: string;
}
