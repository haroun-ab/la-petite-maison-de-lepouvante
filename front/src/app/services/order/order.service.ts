import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO } from '../../entities/order/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  // ← passer par la gateway sur le port 8888
  private baseUrl = 'http://localhost:8888/order/orders';

  constructor(private http: HttpClient) {}

  getAll(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(this.baseUrl);
  }

  getById(id: number): Observable<OrderDTO> {
    return this.http.get<OrderDTO>(`${this.baseUrl}/${id}`);
  }

  createOrder(order: any): Observable<OrderDTO> {
    return this.http.post<OrderDTO>(this.baseUrl, order);
  }
}
