import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-option',
  templateUrl: './button-option.component.html',
  styleUrls: ['./button-option.component.scss'],
})
export class ButtonOptionComponent {
  @Input() isActive!: boolean;
  @Output() checkedChange = new EventEmitter<any>();
  @Input() nameOption!: string | { name: string; url: string };
}
