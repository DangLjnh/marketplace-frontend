import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFastComponent } from './icon-fast.component';

describe('IconFastComponent', () => {
  let component: IconFastComponent;
  let fixture: ComponentFixture<IconFastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconFastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconFastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
