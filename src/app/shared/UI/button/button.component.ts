import { Component, Input } from '@angular/core';
type Theme = 'blue';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() className!: string;
  @Input() loading: boolean = false;
  @Input() disable: boolean = false;
  @Input() theme!: Theme;
  @Input() types: string = 'button';
}
