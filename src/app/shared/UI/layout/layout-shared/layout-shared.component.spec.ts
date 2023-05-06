import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSharedComponent } from './layout-shared.component';

describe('LayoutSharedComponent', () => {
  let component: LayoutSharedComponent;
  let fixture: ComponentFixture<LayoutSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutSharedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
