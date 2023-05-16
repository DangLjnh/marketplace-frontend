import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss'],
})
export class FormTextComponent {
  @Input() name!: string;
  @Input() formName!: string;
}
