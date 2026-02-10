import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product';
import { ProductDetailComponent } from './components/product-detail-component/product-detail-component';

export const routes: Routes = [
  { path: '', component: ProductComponent },          // page liste
  { path: 'product/:id', component: ProductDetailComponent } // page détail
];
