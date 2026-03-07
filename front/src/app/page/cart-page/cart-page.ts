import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart';
import {Product} from '../../entities/product/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDTO } from '../../entities/order/order.model';
import { OrderService } from '../../services/order/order.service';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {

constructor(
  private router: Router,
  public cartService: CartService,
  private orderService: OrderService
) {}
  get cart() {
    return this.cartService.cart;
  }

  getTotalPrice(): number {
    return this.cart().reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }

  updateQuantity(itemId: number, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.cartService.removeFromCart(itemId);
      return;
    }

    this.cartService.updateQuantity(itemId, newQuantity);
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  checkout(): void {

    const order = {
      items: this.cart().map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      total: this.getTotalPrice(),
      status: 'CREATED'
    };

   this.orderService.createOrder(order).subscribe({
     next: (createdOrder: OrderDTO) => {
       console.log('Commande créée :', createdOrder);

       alert('Commande créée');
       this.cartService.clearCart();
       this.router.navigate(['/']);
     },
     error: (err: HttpErrorResponse) => {
       console.error('Erreur lors de la commande :', err);
       alert('Erreur lors de la commande');
     }
   });
  }
}
