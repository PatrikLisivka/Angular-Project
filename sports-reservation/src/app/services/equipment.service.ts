import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getEquipment(): Observable<any> {
    const token = this.authService.getToken();
    const requestBody = { token };
    console.log('GET EQUIPMENT REQUEST BODY:', requestBody);
    return this.http.post(`${this.baseUrl}/listofitems`, requestBody);
  }

  addEquipment(item: any): Observable<any> {
    const token = this.authService.getToken();
    const requestBody = {
      token,
      item: {
        name: item.name,
        description: item.description,
        price: Number(item.price),
      },
    };
    console.log('ADD EQUIPMENT REQUEST BODY:', requestBody);
    return this.http.post(`${this.baseUrl}/items`, requestBody);
  }

  updateEquipment(id: number, item: any): Observable<any> {
    const token = this.authService.getToken();
    const requestBody = {
      token,
      item: {
        name: item.name,
        description: item.description,
        price: Number(item.price),
      },
    };
    console.log('UPDATE EQUIPMENT REQUEST BODY:', requestBody);
    return this.http.put(`${this.baseUrl}/items/${id}`, requestBody);
  }

  getEquipmentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/items/${id}`);
  }


  deleteEquipment(id: number): Observable<any> {
    const token = this.authService.getToken();
    const requestBody = { token };
    console.log('DELETE EQUIPMENT REQUEST BODY:', requestBody);
    return this.http.request('delete', `${this.baseUrl}/items/${id}`, {
      body: requestBody,
    });
  }
}
