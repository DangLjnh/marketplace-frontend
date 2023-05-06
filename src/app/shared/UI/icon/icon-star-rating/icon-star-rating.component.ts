import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-star-rating',
  templateUrl: './icon-star-rating.component.html',
  styleUrls: ['./icon-star-rating.component.scss'],
})
export class IconStarRatingComponent {
  @Input() sizeStar: string = '15';
}
