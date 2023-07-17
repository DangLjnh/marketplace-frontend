import { Observable, filter, map, pluck, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GroupRoleService } from '../../data-access/group-role/group-role.service';
import { errorCode } from 'src/app/shared/model/model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-group-role-create-edit',
  templateUrl: './admin-group-role-create-edit.component.html',
  styleUrls: ['./admin-group-role-create-edit.component.scss'],
})
export class AdminGroupRoleCreateEditComponent implements OnInit {
  listRole!: any[];
  groupID!: number | string | null;
  all_selected_values: string[] = [];
  dataGroup!: any;
  groupRoleForm = this.fb.group({
    name: ['', Validators.required],
    desc: ['', Validators.compose([Validators.required])],
  });
  submitForm() {
    const formValues = this.groupRoleForm.value;
    const dataRaw = {
      id: this.groupID,
      name: formValues.name,
      desc: formValues.desc,
      dataGroup: this.all_selected_values,
    };
    if (this.groupID) {
      this.groupRoleService.updateGroup(dataRaw).subscribe((data) => {
        if (+data.EC === errorCode.SUCCESS) {
          this.toastrService.success(data.EM);
        } else {
          this.toastrService.error(data.EM);
        }
      });
    } else {
      this.groupRoleService.createGroup(dataRaw).subscribe((data) => {
        if (+data.EC === errorCode.SUCCESS) {
          this.toastrService.success(data.EM);
        } else {
          this.toastrService.error(data.EM);
        }
      });
    }
  }

  onChange(value: string): void {
    if (this.all_selected_values.includes(value)) {
      this.all_selected_values = this.all_selected_values.filter(
        (item) => item !== value
      );
    } else {
      this.all_selected_values.push(value);
    }
  }
  handleChecked(roleID: number) {
    return this.all_selected_values.includes(String(roleID));
  }
  constructor(
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private groupRoleService: GroupRoleService,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.groupRoleService
      .readAllRole()
      .pipe(map((data) => data.DT))
      .subscribe((val) => {
        this.listRole = val;
        this.listRole.forEach((item) => {
          item.checked = false;
        });
        if (val) {
          this.route.params
            .pipe(
              pluck('id'),
              switchMap((id) => this.groupRoleService.readSingleGroup(id)),
              filter((product) => !!product),
              map((product) => product.DT)
            )
            .subscribe((data) => {
              if (data) {
                data.Roles.forEach((item: any) => {
                  this.all_selected_values.push(item.id);
                });
                val?.forEach((item: any) => {
                  this.all_selected_values.forEach((el) => {
                    if (item.id === el) {
                      item.checked = true;
                    }
                  });
                });
                this.listRole = val;
                this.groupRoleForm.patchValue({
                  name: data.name,
                  desc: data.desc,
                });
              }
            });
        }
      });
    this.groupID = this.route.snapshot.paramMap.get('id');
  }
}
