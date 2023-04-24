import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDailyDiscoverComponent } from './home-daily-discover.component';

describe('HomeDailyDiscoverComponent', () => {
  let component: HomeDailyDiscoverComponent;
  let fixture: ComponentFixture<HomeDailyDiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDailyDiscoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDailyDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
