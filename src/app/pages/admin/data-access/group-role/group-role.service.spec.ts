import { TestBed } from '@angular/core/testing';

import { GroupRoleService } from './group-role.service';

describe('GroupRoleService', () => {
  let service: GroupRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
