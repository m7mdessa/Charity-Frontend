import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autherizationGuard } from './autherization.guard';

describe('autherizationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autherizationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
