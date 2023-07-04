import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../data-access/home.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.scss'],
})
export class HomeSidebarComponent implements OnInit {
  listCategory$!: Observable<any>;
  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    this.listCategory$ = this.homeService
      .readAllCategory()
      .pipe(map((cate) => cate.DT));
  }
}
