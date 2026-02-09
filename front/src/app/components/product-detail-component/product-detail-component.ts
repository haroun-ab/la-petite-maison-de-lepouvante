import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../entities/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-component.html',
  styleUrls: ['./product-detail-component.css']
})
export class ProductDetailComponent {
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
