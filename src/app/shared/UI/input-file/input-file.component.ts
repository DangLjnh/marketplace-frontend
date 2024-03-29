import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICategory, IUser } from '../../model/interface';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent {
  @Input() base64Image!: string;
  @Input() dataUser!: IUser;
  @Input() dataShop!: IUser;
  @Input() dataCategory!: ICategory;
  @Output() handleChange = new EventEmitter<any>();
}
