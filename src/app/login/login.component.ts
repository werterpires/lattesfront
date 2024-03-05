import { Component } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginDto } from './types';
import { LoaderService } from '../shared/loader/loader.service';
import { Router } from '@angular/router';
import { AlertsService } from '../shared/alerts/alerts.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ModalComponent, FormsModule, HttpClientModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginDto: LoginDto = {
    email: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private loader: LoaderService,
    private router: Router,
    private alerts: AlertsService
  ) {}

  login() {
    this.loader.showLoader();
    this.loginService.login(this.loginDto).subscribe({
      next: (accessToken) => {
        localStorage.setItem('accessToken', accessToken.accessToken);
        this.loader.hideLoader();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        this.alerts.showAlerts('error', 'Não foi possível realizar o Login', [
          error.message,
        ]);
        this.loader.hideLoader();
      },
    });
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
