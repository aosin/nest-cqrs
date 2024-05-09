import { ContactController } from './contact.controller';
import { TestBed } from '@automock/jest';

describe('ContactController', () => {
  let controller: ContactController;

  beforeEach(async () => {
    const { unit } = await TestBed.create(ContactController).compile();

    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
