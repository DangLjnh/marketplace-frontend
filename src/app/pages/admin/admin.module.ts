import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { HeaderSellerComponent } from 'src/app/layouts/header/header-seller/header-seller.component';
import { AdminUserComponent } from './feature/admin-user/admin-user.component';
import { AdminCatgoryComponent } from './feature/admin-catgory/admin-catgory.component';
import { AdminGroupRoleComponent } from './feature/admin-group-role/admin-group-role.component';
import { AdminSidebarComponent } from './feature/admin-sidebar/admin-sidebar.component';
import { AdminPortalLayoutComponent } from './feature/admin-portal-layout/admin-portal-layout.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminEditGroupModalComponent } from './feature/admin-edit-group-modal/admin-edit-group-modal.component';
import { AdminGroupRoleCreateEditComponent } from './feature/admin-group-role-create-edit/admin-group-role-create-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserComponent,
    AdminCatgoryComponent,
    AdminGroupRoleComponent,
    AdminSidebarComponent,
    AdminPortalLayoutComponent,
    AdminEditGroupModalComponent,
    AdminGroupRoleCreateEditComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    IconModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
})
export class AdminModule {}
