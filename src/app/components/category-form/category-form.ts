import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categoryForm!: FormGroup;
  isEditMode = signal(false);
  categoryId: number | null = null;

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.checkEditMode();
  }

  checkEditMode(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode.set(true);
      this.categoryId = +idParam;
      this.categoryService.getCategoryById(this.categoryId).subscribe({
        next: (category) => this.categoryForm.patchValue(category),
        error: (err) => console.error('Error fetching category details', err)
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) return;

    if (this.isEditMode() && this.categoryId) {
      this.categoryService.updateCategory(this.categoryId, this.categoryForm.value).subscribe({
        next: () => this.router.navigate(['/categories']),
        error: (err) => console.error('Error updating category', err)
      });
    } else {
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: () => this.router.navigate(['/categories']),
        error: (err) => console.error('Error creating category', err)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/categories']);
  }
}