import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  getEquipment(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items`, {
      headers: this.getAuthHeaders(),
    });
  }

  addEquipment(item: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/items`,
      { item },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  updateEquipment(id: number, item: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/items/${id}`,
      { item },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  deleteEquipment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/items/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
