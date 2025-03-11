import { TestBed } from '@angular/core/testing';

import { AgentDashboardService } from './agent-dashboard.service';

describe('AgentDashboardService', () => {
  let service: AgentDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
