import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://localhost:3000/';
  

  constructor(private http: HttpClient) { }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/product-catalog/create`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/product-catalog/update`, product);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/product-catalog/get/by-id/${id}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/product-catalog/get/all`);
  }

  deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/product-catalog/delete/${id}`);
  }

  AddUpdateProduct(data:any):Observable<any>{
    return this.http.post(this.baseUrl+"product" , data)
  }
}
