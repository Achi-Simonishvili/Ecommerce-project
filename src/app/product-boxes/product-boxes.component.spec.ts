import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBoxesComponent } from './product-boxes.component';

describe('ProductBoxesComponent', () => {
  let component: ProductBoxesComponent;
  let fixture: ComponentFixture<ProductBoxesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductBoxesComponent]
    });
    fixture = TestBed.createComponent(ProductBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
