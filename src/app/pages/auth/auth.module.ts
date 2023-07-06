import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthComponent } from 'src/app/layouts/auth/auth.component';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './feature/register/register.component';
import { LoginPageComponent } from './feature/login-page/login-page.component';
@NgModule({
  declarations: [LoginPageComponent, RegisterComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    IconModule,
  ],
})
export class AuthModule {}
