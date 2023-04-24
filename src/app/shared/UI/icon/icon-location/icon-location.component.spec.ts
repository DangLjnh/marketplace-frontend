import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLocationComponent } from './icon-location.component';

describe('IconLocationComponent', () => {
  let component: IconLocationComponent;
  let fixture: ComponentFixture<IconLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
