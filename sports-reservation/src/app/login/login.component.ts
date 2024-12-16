import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/equipment']);
      },
      (error) => {
        this.errorMessage = 'Prihlásenie zlyhalo. Skúste to znova.';
        console.error(error);
      }
    );
  }
}
