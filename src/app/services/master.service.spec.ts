import { ValueService } from './value.service';
// import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';

describe('MasterService', () => {
  // let service: MasterService;

  // beforeEach(() => {
  //   service = new MasterService();
  // });

  it('should return "my value" from real service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my-value');
  });

  it('should return "other value" from fake object', () => {
    const fake = { getValue: () => 'fake from object' };
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake from object');
  });
});
