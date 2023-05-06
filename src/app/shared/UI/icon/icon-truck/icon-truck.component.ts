import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-truck',
  templateUrl: './icon-truck.component.html',
  styleUrls: ['./icon-truck.component.scss'],
})
export class IconTruckComponent {
  @Input() color!: string;
  @Input() stroke: string = '#26aa99';
}
