import {Component, OnInit, signal, computed, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardComponent } from '../../components/card-component/card-component';
import {Product} from '../../entities/product/product.model';
import {ProductService} from '../../services/product/product';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './product-page.html',
  styleUrls: ['./product-page.css']
})
export class ProductPage implements OnInit {
  products = signal<Product[]>([]); // signal pour reactive
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Erreur en récupérant les produits', err)
    });
  }

  openProduct(product: Product) {
    this.router.navigate(['/products', product.id]);
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }
}
