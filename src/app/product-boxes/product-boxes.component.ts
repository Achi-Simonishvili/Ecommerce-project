import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../services/product';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-boxes',
  templateUrl: './product-boxes.component.html',
  styleUrls: ['./product-boxes.component.scss'],
})
export class ProductBoxesComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() products: Product[] = [];
  private listeners: (() => void)[] = [];
  private classNames: string[] = [];
  private directions: { [key: number]: string } = {
    0: 'top',
    1: 'right',
    2: 'bottom',
    3: 'left',
  };

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private prodSvc: ProductsService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.classNames = ['in', 'out']
      .map((p) => Object.values(this.directions).map((d) => `${p}-${d}`))
      .reduce((a, b) => a.concat(b));
  }

  ngOnInit(): void {
    if (this.products.length === 0) {
      this.prodSvc.getProducts().subscribe((data: any) => {
        this.products = data;
        this.cdRef.detectChanges();
        this.initializeHoverEffects();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.cdRef.detectChanges();
      this.initializeHoverEffects();
    }
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  ngAfterViewInit(): void {
    this.initializeHoverEffects();
  }

  initializeHoverEffects(): void {
    this.listeners.forEach((unlisten) => unlisten());
    this.listeners = [];

    const nodes = Array.from(
      this.el.nativeElement.querySelectorAll('li')
    ) as HTMLElement[];
    nodes.forEach((node: HTMLElement) => {
      const mouseoverListener = this.renderer.listen(node, 'mouseover', (ev) =>
        this.update(ev, node, 'in')
      );
      const mouseoutListener = this.renderer.listen(node, 'mouseout', (ev) =>
        this.update(ev, node, 'out')
      );
      this.listeners.push(mouseoverListener, mouseoutListener);
    });
  }

  ngOnDestroy(): void {
    this.listeners.forEach((unlisten) => unlisten());
  }

  getDirectionKey(ev: MouseEvent, node: HTMLElement): number {
    const { width, height, top, left } = node.getBoundingClientRect();
    const l = ev.pageX - (left + window.pageXOffset);
    const t = ev.pageY - (top + window.pageYOffset);
    const x = l - (width / 2) * (width > height ? height / width : 1);
    const y = t - (height / 2) * (height > width ? width / height : 1);
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  }

  update(ev: MouseEvent, node: HTMLElement, prefix: string): void {
    node.classList.remove(...this.classNames);
    node.classList.add(
      `${prefix}-${this.directions[this.getDirectionKey(ev, node)]}`
    );
  }
}
