import { Component } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginDto } from './types';
import { LoaderService } from '../shared/loader/loader.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  login() {
    this.loader.showLoader();
    this.loginService.login(this.loginDto).subscribe({
      next: (accessToken) => {
        console.log(accessToken);
        localStorage.setItem('accessToken', accessToken.accessToken);
      },
    });
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
