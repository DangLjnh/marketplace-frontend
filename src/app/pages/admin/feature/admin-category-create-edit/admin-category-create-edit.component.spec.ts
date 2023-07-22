import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryCreateEditComponent } from './admin-category-create-edit.component';

describe('AdminCategoryCreateEditComponent', () => {
  let component: AdminCategoryCreateEditComponent;
  let fixture: ComponentFixture<AdminCategoryCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
