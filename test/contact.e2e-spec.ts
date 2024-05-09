import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateContactDto } from '../src/contact/dto/create-contact.dto';
import { Contact } from '../src/contact/entities/contact.entity';

describe('ContactController (e2e)', () => {
  let app: INestApplication;

  const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  const anyUuid = expect.stringMatching(uuidPattern);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/contact (GET)', () => {
    return request(app.getHttpServer()).get('/contact').expect(200).expect([]);
  });

  it('/contact (POST)', () => {
    const contact = { name: 'Krumm' } satisfies CreateContactDto;
    return request(app.getHttpServer())
      .post('/contact')
      .send(contact)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject({
          id: anyUuid,
          name: 'Krumm',
          deleted: false,
        });
      });
  });

  it('/contact (POST), invalid', () => {
    return request(app.getHttpServer())
      .post('/contact')
      .send({ bar: 'foo' })
      .expect(400);
  });

  describe('with existing contacts', () => {
    let createdContacts: Contact[];

    async function createContact(contactData: CreateContactDto) {
      const { body: contact } = await request(app.getHttpServer())
        .post('/contact')
        .send(contactData)
        .expect(201);
      createdContacts.push(contact);
      return contact;
    }

    const omitVersionInfo = ({ ...attrs }: Contact) => {
      delete attrs.updatedAt;
      delete attrs.createdAt;
      return attrs;
    };

    beforeEach(async () => {
      createdContacts = [];
      await createContact({ name: 'Krumm' });
      await createContact({ name: 'Oblina' });
      await createContact({ name: 'Ickis' });
    });

    it('/contact (GET)', () => {
      return request(app.getHttpServer())
        .get('/contact')
        .expect(200)
        .expect(createdContacts);
    });

    it('/contact/{id} (GET)', () => {
      const contact = createdContacts[0];
      return request(app.getHttpServer())
        .get(`/contact/${contact.id}`)
        .expect(200)
        .expect(contact);
    });

    it('/contact/{id} (GET), not found', () => {
      return request(app.getHttpServer())
        .get(`/contact/7e175c86-e064-4393-847a-f62ad909e892`)
        .expect(404);
    });

    it('/contact/{id} (PATCH)', () => {
      const contact = createdContacts[0];
      return request(app.getHttpServer())
        .patch(`/contact/${contact.id}`)
        .send({ tags: '#those_eyes' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            ...omitVersionInfo(contact),
            tags: '#those_eyes',
          });
        });
    });

    it('/contact/{id} (PATCH), not found', () => {
      return request(app.getHttpServer())
        .patch(`/contact/7e175c86-e064-4393-847a-f62ad909e892`)
        .send({ tags: '#aaahh' })
        .expect(404);
    });

    it('/contact/{id} (PATCH), invalid', () => {
      const contact = createdContacts[0];
      return request(app.getHttpServer())
        .patch(`/contact/${contact.id}`)
        .send({ foo: 'bar', tags: 42 })
        .expect(400);
    });

    it('/contact/{id} (DELETE)', () => {
      const contact = createdContacts[0];
      return request(app.getHttpServer())
        .delete(`/contact/${contact.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            ...omitVersionInfo(contact),
            deleted: true,
          });
        });
    });

    it('/contact/{id} (DELETE), not found', () => {
      return request(app.getHttpServer())
        .delete(`/contact/7e175c86-e064-4393-847a-f62ad909e892`)
        .expect(404);
    });

    it('/contact/{id} (DELETE) -> /contact (GET)', async () => {
      const contact = createdContacts[0];
      await request(app.getHttpServer())
        .delete(`/contact/${contact.id}`)
        .expect(200);
      return request(app.getHttpServer())
        .get(`/contact`)
        .expect(200)
        .expect(createdContacts.slice(1));
    });
  });
});
