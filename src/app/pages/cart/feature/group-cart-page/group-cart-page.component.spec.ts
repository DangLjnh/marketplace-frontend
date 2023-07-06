import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCartPageComponent } from './group-cart-page.component';

describe('GroupCartPageComponent', () => {
  let component: GroupCartPageComponent;
  let fixture: ComponentFixture<GroupCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupCartPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
