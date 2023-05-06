import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-list',
  templateUrl: './star-list.component.html',
  styleUrls: ['./star-list.component.scss'],
})
export class StarListComponent {
  @Input() sizeStar: string = '15';
}
