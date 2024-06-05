import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: LoginService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        this.router.navigate(['home']); // Redirect to home page after login
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
