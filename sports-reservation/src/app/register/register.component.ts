import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) { }

  onRegister(): void {
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        this.message = 'Registration successful!';
      },
      error: (err) => {
        this.message = err.error.message || 'Registration failed!';
      }
    });
  }
}