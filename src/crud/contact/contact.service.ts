import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact) private readonly contactModel: typeof Contact,
  ) {}
  async create(createContactDto: CreateContactDto) {
    return await this.contactModel.create({ ...createContactDto });
  }

  async findAll() {
    return await this.contactModel.findAll({ where: { deleted: false } });
  }

  async findOne(id: string) {
    return await this.contactModel.findByPk(id);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const result = await this.contactModel.update(
      { ...updateContactDto },
      { where: { id }, returning: true },
    );
    const contact = result?.[1]?.[0];
    if (contact) return contact;
    return this.contactModel.findByPk(id);
  }

  remove(id: string) {
    return this.update(id, { deleted: true });
  }
}
