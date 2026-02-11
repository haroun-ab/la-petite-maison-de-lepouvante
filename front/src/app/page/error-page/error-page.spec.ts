import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ErrorPage', () => {
  let component: Error;
  let fixture: ComponentFixture<Error>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Error);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
