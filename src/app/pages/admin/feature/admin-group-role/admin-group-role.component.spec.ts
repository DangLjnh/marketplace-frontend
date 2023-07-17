import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupRoleComponent } from './admin-group-role.component';

describe('AdminGroupRoleComponent', () => {
  let component: AdminGroupRoleComponent;
  let fixture: ComponentFixture<AdminGroupRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGroupRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
