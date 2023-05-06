import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconGuardComponent } from './icon-guard.component';

describe('IconGuardComponent', () => {
  let component: IconGuardComponent;
  let fixture: ComponentFixture<IconGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconGuardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
