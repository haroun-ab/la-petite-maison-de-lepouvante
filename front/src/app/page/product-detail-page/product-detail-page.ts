import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Product} from '../../entities/product/product.model';
import {ProductService} from '../../services/product/product';

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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.loadProduct();
  }

  loadProduct() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null && !isNaN(id)) {
      this.productService.getById(id).subscribe({
        next: (prod) => {
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

  saveProduct(product: Product) {
    console.log('Ajouter au panier:', product);
    // Logique pour ajouter au panier ici
  }

  removeProduct(product: Product) {
    console.log('Supprimer le produit:', product);
    // Logique pour supprimer le produit ici
  }
}
