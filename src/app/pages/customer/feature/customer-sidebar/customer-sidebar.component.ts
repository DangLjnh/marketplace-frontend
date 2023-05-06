import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, pluck } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { IUser } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-customer-sidebar',
  templateUrl: './customer-sidebar.component.html',
  styleUrls: ['./customer-sidebar.component.scss'],
})
export class CustomerSidebarComponent implements OnInit {
  dataUser!: IUser;
  currentRoute: string = '';
  accountNav = [
    {
      name: 'My account',
      url: '/customer/account/edit',
      icon: 'account',
    },
    {
      name: 'Change password',
      url: '/customer/account/password',
      icon: 'lock',
    },
    {
      name: 'Addresses',
      url: '/customer/account/address',
      icon: 'location',
    },
    {
      name: 'My Purchase',
      url: '/customer/account/purchase',
      icon: 'order',
    },
  ];

  onChangeRoute() {
    this.router.events
      .pipe(
        filter((event: any): event is NavigationEnd => {
          return event instanceof NavigationEnd;
        })
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.authService.dataUser$.subscribe((data: any) => {
      this.dataUser = data;
    });
  }
}
