import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { Product } from '../services/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private prodSvc: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.prodSvc.getProductById(productId).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
