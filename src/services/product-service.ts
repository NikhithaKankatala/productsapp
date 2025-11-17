import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from './productmodel';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = 'http://localhost:3000/products';
  private categoriesUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(res => res),
      catchError(err => throwError(() => err))
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, data: Partial<Product>): Observable<Product> {
    // Fixed: removed extra '/products'
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriesUrl).pipe(
      map(res => res),
      catchError(err => throwError(() => err))
    );
  }
}
