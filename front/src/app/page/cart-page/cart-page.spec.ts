import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { CartPage } from './cart-page';

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;

  beforeEach(async () => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(() => null),
        removeItem: vi.fn(() => null)
      },
      writable: true
    });

    await TestBed.configureTestingModule({
      imports: [CartPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
