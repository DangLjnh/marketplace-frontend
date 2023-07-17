import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPortalLayoutComponent } from './admin-portal-layout.component';

describe('AdminPortalLayoutComponent', () => {
  let component: AdminPortalLayoutComponent;
  let fixture: ComponentFixture<AdminPortalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPortalLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPortalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
