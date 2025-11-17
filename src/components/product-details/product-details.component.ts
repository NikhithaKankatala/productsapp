import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { switchMap } from 'rxjs';
import { Product } from '../../services/productmodel';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ CommonModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.productService.getProductById(+params.get('id')!))
    )
    .subscribe(p => this.product = p);
  }

  editProduct() {
    this.router.navigate(['/products', this.product.id, 'edit']);
  }
}
