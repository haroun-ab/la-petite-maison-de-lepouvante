import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart';
import {Product} from '../../entities/product/product.model';

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
    public cartService: CartService
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
    alert('Fonctionnalité de checkout à venir !');
  }
}
