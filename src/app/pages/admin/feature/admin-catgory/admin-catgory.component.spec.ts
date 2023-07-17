import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatgoryComponent } from './admin-catgory.component';

describe('AdminCatgoryComponent', () => {
  let component: AdminCatgoryComponent;
  let fixture: ComponentFixture<AdminCatgoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCatgoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCatgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
