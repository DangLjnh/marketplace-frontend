import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-counter',
  templateUrl: './input-counter.component.html',
  styleUrls: ['./input-counter.component.scss'],
})
export class InputCounterComponent {
  @Input() valueCounter!: number;
  @Output() checkedPlus = new EventEmitter<number>();
  @Output() checkedMinus = new EventEmitter<number>();

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value !== '0') {
      this.valueCounter = +input.value;
    }
    if (!input.value || input.value === '0') {
      this.valueCounter = 1;
      input.value = '1';
    }
  }
}
