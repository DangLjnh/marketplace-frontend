import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GroupRoleService } from 'src/app/pages/admin/data-access/group-role/group-role.service';
import { UserService } from 'src/app/pages/admin/data-access/user/user.service';
import { IGroup } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-admin-update-user-modal',
  templateUrl: './admin-update-user-modal.component.html',
  styleUrls: ['./admin-update-user-modal.component.scss'],
})
export class AdminUpdateUserModalComponent implements OnInit {
  listGroup!: IGroup[];
  currentGroup!: number;
  userForm = this.fb.group({
    fullName: [{ value: '', disabled: true }],
    phone: [{ value: '', disabled: true }],
    email: [{ value: '', disabled: true }],
    group: ['', Validators.required],
  });
  handleChooseGroup(groupID: number) {
    this.currentGroup = groupID;
  }
  submitForm() {
    const rawData = {
      userID: this.data.userID,
      groupID: this.currentGroup,
    };
    this.userService.updateGroupUser(rawData).subscribe((data) => {
      if (+data.EC === 0) {
        this.toastService.success(data.EM);
        this.dialogRef.close();
        this.userService
          .readAllUser({ offset: 0, limit: 20 })
          .subscribe((data) => {
            this.userService.listUser = data.DT;
          });
      } else {
        this.toastService.error(data.EM);
      }
    });
  }
  constructor(
    public dialogRef: MatDialogRef<AdminUpdateUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private groupService: GroupRoleService,
    private fb: FormBuilder,
    private toastService: ToastrService
  ) {}
  ngOnInit(): void {
    this.groupService.readAllGroup().subscribe((data) => {
      this.listGroup = data.DT;
    });
    this.userService.readSingleUser(this.data.userID).subscribe((data) => {
      this.userForm.patchValue({
        fullName: data.DT?.User_Detail?.full_name,
        phone: data.DT?.phone,
        email: data.DT?.User_Detail?.email,
        group: data.DT?.Group?.name,
      });
      this.currentGroup = data.DT?.Group?.id;
    });
  }
}
