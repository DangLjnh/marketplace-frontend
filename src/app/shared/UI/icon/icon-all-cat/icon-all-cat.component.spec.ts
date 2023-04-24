import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAllCatComponent } from './icon-all-cat.component';

describe('IconAllCatComponent', () => {
  let component: IconAllCatComponent;
  let fixture: ComponentFixture<IconAllCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconAllCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconAllCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
