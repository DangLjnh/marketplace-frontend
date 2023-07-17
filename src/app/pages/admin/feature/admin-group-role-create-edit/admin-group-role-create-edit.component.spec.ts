import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupRoleCreateEditComponent } from './admin-group-role-create-edit.component';

describe('AdminGroupRoleCreateEditComponent', () => {
  let component: AdminGroupRoleCreateEditComponent;
  let fixture: ComponentFixture<AdminGroupRoleCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupRoleCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGroupRoleCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
