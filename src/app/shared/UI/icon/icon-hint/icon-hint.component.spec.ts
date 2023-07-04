import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconHintComponent } from './icon-hint.component';

describe('IconHintComponent', () => {
  let component: IconHintComponent;
  let fixture: ComponentFixture<IconHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconHintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
