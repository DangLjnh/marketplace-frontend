import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPortalFormComponent } from './seller-portal-form.component';

describe('SellerPortalFormComponent', () => {
  let component: SellerPortalFormComponent;
  let fixture: ComponentFixture<SellerPortalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerPortalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerPortalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
