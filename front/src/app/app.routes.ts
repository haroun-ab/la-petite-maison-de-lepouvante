import { Routes } from '@angular/router';
import { ProductPage } from './page/product-page/product-page';
import { ProductDetailPage } from './page/product-detail-page/product-detail-page';
import { HomePage } from './page/home-page/home-page';
import { ErrorPage } from './page/error-page/error-page';
import { CartPage } from './page/cart-page/cart-page';

export const routes: Routes = [
  { path: '', component: HomePage },          // page accueil
  { path: 'products', component: ProductPage },          // page liste
  { path: 'products/:id', component: ProductDetailPage }, // page détail
  { path: 'cart', component: CartPage }, // page panier
  { path: '**', component: ErrorPage } // page erreur
];
