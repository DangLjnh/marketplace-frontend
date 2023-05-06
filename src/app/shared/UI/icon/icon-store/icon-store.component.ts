import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-store',
  templateUrl: './icon-store.component.html',
  styleUrls: ['./icon-store.component.scss'],
})
export class IconStoreComponent {
  @Input() color: string = '#333';
  @Input() stroke: string = '#333';
  @Input() fill: string = '#333';
}
