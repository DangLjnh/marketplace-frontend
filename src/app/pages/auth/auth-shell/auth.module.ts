import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPageComponent } from '../login/feature/login-page/login-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from '../register/feature/register/register.component';
import { AuthComponent } from 'src/app/layouts/auth/auth.component';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
@NgModule({
  declarations: [LoginPageComponent, RegisterComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    IconModule,
  ],
})
export class AuthModule {}
