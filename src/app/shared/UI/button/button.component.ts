import { Component, Input } from '@angular/core';
type Theme = 'blue';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() className!: string;
  @Input() theme!: Theme;
  @Input() types: string = 'button';
}
