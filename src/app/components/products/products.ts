import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => { this.products = data; },
      error: (err) => { console.error(err); }
    });
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: () => { product.checked = !product.checked; }
    });
  }

  handleDeleteProduct(product: Product) {
    if (confirm("Delete this product?")) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => { this.products = this.products.filter(p => p.id !== product.id); }
      });
    }
  }
}