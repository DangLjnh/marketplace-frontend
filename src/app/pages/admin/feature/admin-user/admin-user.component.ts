import { Component, OnInit } from '@angular/core';
import { UserService } from '../../data-access/user/user.service';
import { IUser } from 'src/app/shared/model/interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AdminUpdateUserModalComponent } from 'src/app/pages/seller/feaure/profile/admin-update-user-modal/admin-update-user-modal.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent implements OnInit {
  listUser!: IUser[];
  formatDate(time: Date) {
    const date = new Date(time);
    return date.toLocaleString('en-GB');
  }
  handleUpdateUser(userID: number) {
    this.dialog.open(AdminUpdateUserModalComponent, {
      data: {
        type: 'edit',
        userID: userID,
      },
    });
  }
  handleBanUser(userID: number) {
    this.userService.banUser(userID).subscribe((data) => {
      if (+data.EC === 0) {
        this.toastService.success(data.EM);
        const rawData = {
          offset: 0,
          limit: 20,
        };
        this.userService.readAllUser(rawData).subscribe((data) => {
          this.listUser = data.DT;
        });
      } else {
        this.toastService.error(data.EM);
      }
    });
  }
  constructor(
    private userService: UserService,
    private toastService: ToastrService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const rawData = {
      offset: 0,
      limit: 20,
    };
    this.userService.listUser$.subscribe((data) => {
      if (data.length > 0) {
        this.listUser = data;
      } else {
        this.userService.readAllUser(rawData).subscribe((data) => {
          this.listUser = data.DT;
        });
      }
    });
  }
}
