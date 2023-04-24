import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-check',
  templateUrl: './icon-check.component.html',
  styleUrls: ['./icon-check.component.scss'],
})
export class IconCheckComponent {
  @Input() color!: string;
}
