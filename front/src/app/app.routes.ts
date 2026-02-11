import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product';
import { ProductDetailComponent } from './components/product-detail-component/product-detail-component';
import {OrderDetailComponent} from './components/order-detail/order-detail-component/order-detail-component';
import {OrderComponent} from './components/order/order-component/order-component';

export const routes: Routes = [
  { path: '', component: ProductComponent, pathMatch: 'full' },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'orders/:id', component: OrderDetailComponent }

];
