import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../services/productmodel';
import { ProductService } from '../../services/product-service';
import { SearchComponent } from '../search/search.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['index', 'name', 'category', 'price', 'status', 'actions'];

  categories: string[] = ['Headphones', 'Earbuds', 'Mobiles', 'Laptops'];
  selectedCategory = '';
  searchText = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.applyFilters();
    });
  }

  onSearch(text: string) {
    this.searchText = text.toLowerCase();
    this.applyFilters();
  }

  onCategoryChange(value: string) {
    this.selectedCategory = value;
    this.applyFilters();
  }

  sortByPrice() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  applyFilters() {
    let data = [...this.products];

    if (this.searchText) {
      data = data.filter(p => p.name.toLowerCase().includes(this.searchText));
    }

    if (this.selectedCategory) {
      data = data.filter(p => p.category === this.selectedCategory);
    }

    data = data.sort((a, b) =>
      this.sortDirection === 'asc' ? a.price - b.price : b.price - a.price
    );

    this.dataSource.data = data;

    // Reset paginator to first page after filtering
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
