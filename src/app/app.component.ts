import { Component, OnInit } from '@angular/core';
import { AuthService } from './pages/auth/data-access/auth.service';
import { IResponse, IUser } from './shared/model/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const refreshToken = localStorage.getItem('refresh_token');
    this.authService.accountUser().subscribe({
      next: (data: any) => {
        this.authService.dataUser = data.DT;
      },
      error: (err: any) => {
        if (refreshToken && err) {
          // window.location.reload();
          this.authService
            .verifyToken(refreshToken)
            .subscribe((data: IResponse) => {
              localStorage.setItem('access_token', data.DT.access_token);
              localStorage.setItem('refresh_token', data.DT.refresh_token);
              this.authService.accountUser().subscribe((data: any) => {
                this.authService.dataUser = data.DT;
              });
            });
        }
      },
    });
  }
}
