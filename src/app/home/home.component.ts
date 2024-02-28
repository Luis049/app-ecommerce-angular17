import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../component/product/product.component';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../types';
import { NgFor } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, NgFor, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  onProductOutput(product: Product) {
    console.log(product, 'Output')
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows)
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe((products: Products) => {
        this.products = products.items;
        this.totalRecords = products.total;
      });
  }

  ngOnInit(): void {
    this.fetchProducts(0, this.rows)
  }
}
