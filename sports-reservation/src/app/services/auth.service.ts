import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000';
  private loggedUserSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getUsername());
  
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setUsername(username);
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { username, password });
  }

  setToken(token: string): void {
    console.log('Token:', token);
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
    this.loggedUserSubject.next(username);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.loggedUserSubject.next(null);
  }

  loggedUser(): Observable<string | null> {
    return this.loggedUserSubject.asObservable();
  }
}
