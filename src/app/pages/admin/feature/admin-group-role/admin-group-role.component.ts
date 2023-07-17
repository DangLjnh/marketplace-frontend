import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GroupRoleService } from '../../data-access/group-role/group-role.service';

@Component({
  selector: 'app-admin-group-role',
  templateUrl: './admin-group-role.component.html',
  styleUrls: ['./admin-group-role.component.scss'],
})
export class AdminGroupRoleComponent implements OnInit {
  listGroup$!: Observable<any>;
  formatDate(time: Date) {
    const date = new Date(time);
    return date.toLocaleString('en-GB');
  }
  constructor(private groupRoleService: GroupRoleService) {}
  ngOnInit(): void {
    this.listGroup$ = this.groupRoleService
      .readAllGroup()
      .pipe(map((group) => group.DT));
  }
}
