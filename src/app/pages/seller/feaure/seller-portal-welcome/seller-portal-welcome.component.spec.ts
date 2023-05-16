import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPortalWelcomeComponent } from './seller-portal-welcome.component';

describe('SellerPortalWelcomeComponent', () => {
  let component: SellerPortalWelcomeComponent;
  let fixture: ComponentFixture<SellerPortalWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerPortalWelcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerPortalWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
