// import { Product } from '../../entities/product/product.model';
// import { Component, OnInit, signal, computed } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { ProductService } from '../../services/product/product';
// import { CardComponent } from '../../components/card-component/card-component';
//
// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule, CardComponent],
//   template: '<p>product works!</p>',
//   styles: []
// })
// export class ProductPage implements OnInit {
//
//   products = signal<Product[]>([]); // signal pour reactive
//   constructor(private productService: ProductService, private router: Router) {}
//
//   ngOnInit(): void {
//     this.productService.getAll().subscribe({
//       next: (data: Product[]) => this.products.set(data),
//       error: (err: unknown) => console.error('Erreur en récupérant les produits', err)
//     });
//   }
//
//   openProduct(product: Product) {
//     this.router.navigate(['/products', product.id]);
//   }
//
//   trackById(index: number, product: Product): number {
//     return product.id;
//   }
// }
