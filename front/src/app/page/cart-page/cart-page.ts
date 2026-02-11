import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  cartItems = signal<CartItem[]>([
    {
      id: 1,
      name: 'Masque Terrifiant',
      price: 29.99,
      quantity: 1,
      image: 'https://fastly.picsum.photos/id/23/3887/4899.jpg?hmac=2fo1Y0AgEkeL2juaEBqKPbnEKm_5Mp0M2nuaVERE6eE'
    },
    {
      id: 2,
      name: 'Costume Vampire',
      price: 49.99,
      quantity: 2,
      image: 'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM'
    },
    {
      id: 3,
      name: 'Décorations Horreur',
      price: 19.99,
      quantity: 3,
      image: 'https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4'
    }
  ]);

  constructor(private router: Router) {}

  getTotalPrice(): number {
    return this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateQuantity(itemId: number, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeItem(itemId);
      return;
    }
    const items = this.cartItems();
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    this.cartItems.set(updatedItems);
  }

  removeItem(itemId: number): void {
    const items = this.cartItems();
    const filteredItems = items.filter(item => item.id !== itemId);
    this.cartItems.set(filteredItems);
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  checkout(): void {
    // À implémenter plus tard
    alert('Fonctionnalité de checkout à venir !');
  }
}
