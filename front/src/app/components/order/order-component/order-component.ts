import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { MatTableModule } from '@angular/material/table';
import { OrderDTO } from '../../../entities/order/order.model';

@Component({
  selector: 'app-order-component',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './order-component.html',
  styleUrls: ['./order-component.css'],
})
export class OrderComponent implements OnInit {
  ordersSignal = signal<OrderDTO[]>([]); // signal qui contient les orders
  displayedColumns: string[] = ['id', 'status', 'clientId', 'orderDate'];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService.getAll().subscribe({
      next: (data: OrderDTO[]) => this.ordersSignal.set(data),
      error: () => this.ordersSignal.set([])
    });
  }

  trackById(index: number, order: OrderDTO): number {
    return order.id!;
  }
}
