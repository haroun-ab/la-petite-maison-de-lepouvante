import { Routes } from '@angular/router';
import { ProductPage } from './page/product-page/product-page';
import { ProductDetailPage } from './page/product-detail-page/product-detail-page';
import { HomePage } from './page/home-page/home-page';
import { ErrorPage } from './page/error-page/error-page';
import { CartPage } from './page/cart-page/cart-page';
import {OrderDetailComponent} from './components/order-detail/order-detail-component/order-detail-component';
import {OrderComponent} from './components/order/order-component/order-component';
import {ProductDetailComponent} from './components/product-detail-component/product-detail-component';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },          // page accueil
  { path: 'products', component: ProductPage },          // page liste
  { path: 'products/:id', component: ProductDetailPage }, // page détail
  { path: 'cart', component: CartPage }, // page panier
  { path: 'orders', component: OrderComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: '**', component: ErrorPage } ,


];
