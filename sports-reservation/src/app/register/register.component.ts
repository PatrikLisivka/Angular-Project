import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private authService: AuthService) { }

  onRegister(): void {
    if (!this.isValidEmail(this.email)) {
      this.message = 'Zadajte platný e-mail!';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.message = 'Heslá sa nezhodujú!';
      return;
    }

    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        this.message = 'Registrácia úspešná!';
      },
      error: (err) => {
        this.message = err.error.message || 'Registrácia zlyhala!';
      },
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
