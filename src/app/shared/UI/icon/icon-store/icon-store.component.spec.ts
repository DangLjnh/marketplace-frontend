import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconStoreComponent } from './icon-store.component';

describe('IconStoreComponent', () => {
  let component: IconStoreComponent;
  let fixture: ComponentFixture<IconStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
