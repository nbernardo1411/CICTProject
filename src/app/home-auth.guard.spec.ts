import { TestBed } from '@angular/core/testing';

import { HomeAuthGuard } from './home-auth.guard';

describe('HomeAuthGuard', () => {
  let guard: HomeAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
