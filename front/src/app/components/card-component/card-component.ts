import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-component',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent {
  @Input() product: any = {};
  @Output() productSelected = new EventEmitter<any>();

  truncateText(text: string, maxLength: number = 80): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  trackById(index: number, product: any) {
    return product.id;
  }

  openProduct(product: any) {
    this.productSelected.emit(product);
  }
}

