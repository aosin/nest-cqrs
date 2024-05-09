import { CqrsContactController } from './cqrs-contact.controller';
import { TestBed } from '@automock/jest';

describe('CqrsContactController', () => {
  let controller: CqrsContactController;

  beforeEach(async () => {
    const { unit } = await TestBed.create(CqrsContactController).compile();

    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
