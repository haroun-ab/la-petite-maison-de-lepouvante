import { Injectable, signal } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSignal = signal<CartItem[]>(this.loadCart());
  cart = this.cartSignal.asReadonly();

  addToCart(product: CartItem) {
    this.cartSignal.update(cart => {
      const existing = cart.find(p => p.id === product.id);

      let updated;

      if (existing) {
        updated = cart.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity } // <- ici on ajoute la quantité demandée
            : p
        );
      } else {
        updated = [...cart, { ...product }]; // quantity déjà incluse
      }

      this.saveCart(updated);
      return updated;
    });
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartSignal.update(cart => {
      const updated = cart.map(p =>
        p.id === productId ? { ...p, quantity } : p
      );
      this.saveCart(updated);
      return updated;
    });
  }

  removeFromCart(productId: number) {
    this.cartSignal.update(cart => {
      const updated = cart.filter(p => p.id !== productId);
      this.saveCart(updated);
      return updated;
    });
  }

  clearCart() {
    this.cartSignal.set([]);
    localStorage.removeItem('cart');
  }

  private saveCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private loadCart(): CartItem[] {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }

}
