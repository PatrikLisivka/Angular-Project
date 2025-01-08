import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent implements OnInit {
  loggedUser: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedUser().subscribe((username) => {
      this.loggedUser = username;
    });

    this.router.resetConfig(routes);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
