import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAvatarDefaultComponent } from './icon-avatar-default.component';

describe('IconAvatarDefaultComponent', () => {
  let component: IconAvatarDefaultComponent;
  let fixture: ComponentFixture<IconAvatarDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconAvatarDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconAvatarDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
