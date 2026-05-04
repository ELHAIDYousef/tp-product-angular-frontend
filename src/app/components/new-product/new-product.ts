import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product';
import { Category } from '../../model/product.model';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: Array<Category> = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (data) => { this.categories = data; }
    });

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      checked: [false],
      category: [null, Validators.required]
    });
  }

  handleSaveProduct() {
    if (this.productForm.valid) {
      this.productService.saveProduct(this.productForm.value).subscribe({
        next: (data) => { 
          alert("Product saved successfully!");
          this.productForm.reset({price: 0, quantity: 0, checked: false});
        },
        error: (err) => { console.error(err); }
      });
    }
  }
}