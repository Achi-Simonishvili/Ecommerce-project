import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../services/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  selectedCategory: string = '';
  priceRange: number = 1000;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private prodSvc: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.prodSvc.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.route.queryParams.subscribe((params) => {
        const searchTerm = params['search'] || '';
        this.applyFilters(searchTerm);
      });
    });
  }

  applyFilters(searchTerm: string = ''): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory =
        !this.selectedCategory || product.category === this.selectedCategory;
      const matchesPrice = product.price <= this.priceRange;
      const matchesSearchTerm = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearchTerm;
    });
  }
}
