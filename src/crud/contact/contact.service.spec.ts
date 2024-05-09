import { ContactService } from './contact.service';
import { TestBed } from '@automock/jest';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const { unit } = TestBed.create(ContactService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
