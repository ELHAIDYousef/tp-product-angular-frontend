import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.host}/products`);
  }

  public getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${this.host}/categories`);
  }

  public checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.host}/products/${product.id}`, {});
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.host}/products/${id}`);
  }

  public saveProduct(product: any): Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`, product);
  }

  public searchProducts(keyword: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.host}/products/search?keyword=${keyword}`);
  }
}