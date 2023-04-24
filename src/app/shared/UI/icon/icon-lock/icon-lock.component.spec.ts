import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLockComponent } from './icon-lock.component';

describe('IconLockComponent', () => {
  let component: IconLockComponent;
  let fixture: ComponentFixture<IconLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconLockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
