import { Component, OnInit } from '@angular/core';
import { Product } from "../../entities/product.model";
import {ProductService} from "../../services/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
  standalone: true
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  savedProducts: Product[] = []; // pour stocker les produits enregistrés
  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        console.log('Données reçues :', data);
        this.products = data;
      },
      error: (err) => console.error('Erreur en récupérant les produits', err)
    });
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }

  saveProduct(product: Product): void {
    if (!this.savedProducts.includes(product)) {
      this.savedProducts.push(product);
      alert(`${product.title} a été enregistré !`);
    } else {
      alert(`${product.title} est déjà enregistré.`);
    }
  }

  removeProduct(product: Product): void {
    const index = this.products.indexOf(product);
    if (index > -1) {
      this.products.splice(index, 1);
      alert(`${product.title} a été supprimé !`);
    }
  }
}
