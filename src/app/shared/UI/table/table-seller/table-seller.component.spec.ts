import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSellerComponent } from './table-seller.component';

describe('TableSellerComponent', () => {
  let component: TableSellerComponent;
  let fixture: ComponentFixture<TableSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
