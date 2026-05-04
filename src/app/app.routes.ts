import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products';
import { NewProductComponent } from './components/new-product/new-product';

export const routes: Routes = [
  { path: "products", component: ProductsComponent },
  { path: "new-product", component: NewProductComponent },
  { path: "", redirectTo: "products", pathMatch: "full" } 
];