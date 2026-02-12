import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Order} from '../../entities/order/order.model';
import {OrderDTO} from '../../model/orderDTO';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = '/ORDERS/orders';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<OrderDTO[]>(this.baseUrl).pipe(
      map(dtos => dtos.map(dto => new Order(dto)))
    );
  }

  getById(id: number): Observable<Order> {
    return this.http.get<OrderDTO>(`${this.baseUrl}/${id}`).pipe(
      map(dto => new Order(dto))
    );
  }
}
