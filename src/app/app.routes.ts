import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { ProductForm } from './components/product-form/product-form';
import { CategoryList } from './components/category-list/category-list';
import { CategoryForm } from './components/category-form/category-form';

export const routes: Routes = [
    {path: "home", component: Home}, 
    {path: "products", component: Products},
    { path: 'products/new', component: ProductForm },
    { path: 'products/edit/:id', component: ProductForm },
    { path: 'categories', component: CategoryList },
    { path: 'categories/new', component: CategoryForm },
    { path: 'categories/edit/:id', component: CategoryForm },
    { path: '**', redirectTo: 'products' }
];
