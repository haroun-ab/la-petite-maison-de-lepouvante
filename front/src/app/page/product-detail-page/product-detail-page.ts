import {Component, EventEmitter, Output, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../entities/product/product.model';
import { ProductService } from '../../services/product/product';
import { CartService } from '../../services/cart/cart';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-page.html',
  styleUrls: ['./product-detail-page.css']
})
export class ProductDetailPage {
  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  itemAdded = false;
  quantity = signal<number>(1);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {
    this.loadProduct();
  }

  loadProduct() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null && !isNaN(id)) {
      this.productService.getById(id).subscribe({
        next: (prod: any) => {
          this.product.set(prod);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Impossible de récupérer le produit');
          this.loading.set(false);
        }
      });
    } else {
      this.error.set('Produit introuvable');
      this.loading.set(false);
    }
  }

  addToCart() {
    const prod = this.product();
    if (!prod) return;

    const qty = this.quantity();

    const existingItem = this.cartService.cart()
      .find(item => item.id === prod.id);

    const alreadyInCart = existingItem ? existingItem.quantity : 0;

    if (qty <= 0 || alreadyInCart + qty > prod.stock) {
      this.snackBar.open(
        `Stock insuffisant (disponible : ${prod.stock - alreadyInCart})`,
        'Fermer',
        {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        }
      );
      return;
    }

    const item = {
      id: prod.id,
      name: prod.title,
      price: prod.price,
      quantity: qty,
      image: prod.image
    };

    this.cartService.addToCart(item);

    this.snackBar.open(
      'Article ajouté au panier !',
      'Fermer',
      {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      }
    );
  }

  quantityTarget(event: Event): number {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    return isNaN(value) ? 1 : value;
  }
}
