import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdsComponent } from './home-ads.component';

describe('HomeAdsComponent', () => {
  let component: HomeAdsComponent;
  let fixture: ComponentFixture<HomeAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAdsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
