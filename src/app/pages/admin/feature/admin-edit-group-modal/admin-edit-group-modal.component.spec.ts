import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditGroupModalComponent } from './admin-edit-group-modal.component';

describe('AdminEditGroupModalComponent', () => {
  let component: AdminEditGroupModalComponent;
  let fixture: ComponentFixture<AdminEditGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditGroupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
