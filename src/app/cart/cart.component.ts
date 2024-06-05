import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../services/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: { product: Product; quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  clearCart(): void {
    this.items = this.cartService.clearCart();
    this.totalPrice = 0;
  }

  checkout(): void {
    this.clearCart();
    window.alert('Thank you for your purchase!');
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.items = this.cartService.getItems();
    this.calculateTotalPrice();
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
    this.items = this.cartService.getItems();
    this.calculateTotalPrice();
  }
}
