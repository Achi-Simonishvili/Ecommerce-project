import { Injectable } from '@angular/core';
import { Product } from './product';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: { product: Product; quantity: number }[] = [];
  private itemCount = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCount.asObservable();

  constructor(private authService: LoginService) {
    this.loadItems();
  }

  private saveItems() {
    sessionStorage.setItem('cartItems', JSON.stringify(this.items));
    this.itemCount.next(
      this.items.reduce((count, item) => count + item.quantity, 0)
    );
  }

  private loadItems() {
    const savedItems = sessionStorage.getItem('cartItems');
    this.items = savedItems ? JSON.parse(savedItems) : [];
    this.itemCount.next(
      this.items.reduce((count, item) => count + item.quantity, 0)
    );
  }

  addToCart(product: Product) {
    if (this.authService.currentUserValue) {
      const existingItem = this.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
      this.saveItems();
      window.alert('Your product has been added to the cart!');
    } else {
      alert('You must be logged in to add items to the cart');
    }
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.saveItems();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveItems();
      }
    }
  }

  getItems(): { product: Product; quantity: number }[] {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.saveItems();
    return this.items;
  }

  getItemCount(): number {
    return this.items.length;
  }
}
