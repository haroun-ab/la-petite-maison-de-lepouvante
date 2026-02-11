import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ProductDTO} from '../model/productDTO';
import {Product} from '../entities/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<ProductDTO[]>(this.baseUrl).pipe(
      map(dtos => dtos.map(dto => new Product(dto)))
    );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<ProductDTO>(`${this.baseUrl}/${id}`).pipe(
      map(dto => new Product(dto))
    );
  }
}
