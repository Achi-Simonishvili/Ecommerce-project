import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @ViewChild('targetDiv') targetDiv!: ElementRef;

  cartItemCount: number = 0;
  currentUser: any;

  searchQuery: string = '';

  constructor(
    private renderer: Renderer2,
    private cartService: CartService,
    private authService: LoginService,
    private router: Router
  ) {}

  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/all-products'], {
        queryParams: { search: this.searchQuery },
      });
      this.searchQuery = '';
    }
  }

  ngOnInit(): void {
    this.cartService.itemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  updateCartItemCount(): void {
    this.cartItemCount = this.cartService.getItemCount();
  }

  clickMenu(): void {
    if (this.targetDiv) {
      const hasClass =
        this.targetDiv.nativeElement.classList.contains('nav-active');
      if (hasClass) {
        this.renderer.removeClass(this.targetDiv.nativeElement, 'nav-active');
      } else {
        this.renderer.addClass(this.targetDiv.nativeElement, 'nav-active');
      }
    }
  }

  menuClass: string = '';

  clickMenu2(): void {
    this.menuClass = this.menuClass === '' ? 'menu-active' : '';
  }
}
