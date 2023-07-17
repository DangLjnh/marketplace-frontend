import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { AdminUserComponent } from './feature/admin-user/admin-user.component';
import { AdminPortalLayoutComponent } from './feature/admin-portal-layout/admin-portal-layout.component';
import { AdminGroupRoleComponent } from './feature/admin-group-role/admin-group-role.component';
import { AdminGroupRoleCreateEditComponent } from './feature/admin-group-role-create-edit/admin-group-role-create-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [SellerGuard],
    children: [
      {
        path: 'portal',
        component: AdminPortalLayoutComponent,
        children: [
          {
            path: 'user',
            component: AdminUserComponent,
          },
          {
            path: 'group',
            component: AdminGroupRoleComponent,
          },
          {
            path: 'group/new',
            component: AdminGroupRoleCreateEditComponent,
          },
          {
            path: 'group/edit/:id',
            component: AdminGroupRoleCreateEditComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
