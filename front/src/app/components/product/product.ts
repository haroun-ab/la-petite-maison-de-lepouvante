import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../entities/product/product.model';
import { ProductService } from '../../services/product/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent implements OnInit {

  products = signal<Product[]>([]); // signal pour reactive
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Erreur en récupérant les produits', err)
    });
  }

  openProduct(product: Product) {
    this.router.navigate(['/product', product.id]);
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }
}
