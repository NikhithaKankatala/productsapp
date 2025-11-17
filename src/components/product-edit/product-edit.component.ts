import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from '../../services/product-service';
import { Product } from '../../services/productmodel';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    status: ['Active', Validators.required],
    description: ['', Validators.required]
  });

  productId!: number;

  categories = ['Headphones', 'Earbuds', 'Mobiles', 'Laptops'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.productId = +params.get('id')!;
        return this.productService.getProductById(this.productId);
      })
    ).subscribe(p => this.form.patchValue(p));
  }

  save() {
    if (this.form.invalid) return;

    this.productService.updateProduct(this.productId, this.form.value as Partial<Product>)
      .subscribe(() => {
        this.router.navigate(['/products', this.productId]);
      });
  }
}
