import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AdminProductComponent } from './feature/admin-product/admin-product.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminCategoryComponent } from './feature/admin-category/admin-category.component';
import { AdminCategoryCreateEditComponent } from './feature/admin-category-create-edit/admin-category-create-edit.component';

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
    AdminProductComponent,
    AdminCategoryComponent,
    AdminCategoryCreateEditComponent,
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
    MatPaginatorModule,
    FormsModule
  ],
})
export class AdminModule {}
