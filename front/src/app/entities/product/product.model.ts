import {ProductDTO} from '../../model/productDTO';

export class Product {
  id!: number;
  category!: string;
  title!: string;
  description!: string;
  price!: number;
  stock!: number;
  image!: string;

  constructor(dto?: ProductDTO) {
    if (dto) {
      this.id = dto.id;
      this.category = dto.category;
      this.title = dto.title;
      this.description = dto.description;
      this.price = dto.price;
      this.stock = dto.stock;
      this.image = dto.image;
    }
  }

  // Exemple de méthode métier
  isInStock(): boolean {
    return this.stock > 0;
  }

  formattedPrice(): string {
    return `${this.price.toFixed(2)} €`;
  }
}
