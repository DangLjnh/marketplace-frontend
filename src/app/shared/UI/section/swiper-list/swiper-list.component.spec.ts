import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperListComponent } from './swiper-list.component';

describe('SwiperListComponent', () => {
  let component: SwiperListComponent;
  let fixture: ComponentFixture<SwiperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiperListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
