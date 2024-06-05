import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursorFollowComponent } from './cursor-follow.component';

describe('CursorFollowComponent', () => {
  let component: CursorFollowComponent;
  let fixture: ComponentFixture<CursorFollowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursorFollowComponent]
    });
    fixture = TestBed.createComponent(CursorFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
