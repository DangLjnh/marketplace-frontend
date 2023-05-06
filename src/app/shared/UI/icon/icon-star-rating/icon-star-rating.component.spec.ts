import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconStarRatingComponent } from './icon-star-rating.component';

describe('IconStarRatingComponent', () => {
  let component: IconStarRatingComponent;
  let fixture: ComponentFixture<IconStarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconStarRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
