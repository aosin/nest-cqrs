import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact) private readonly userModel: typeof Contact,
  ) {}
  async create(createContactDto: CreateContactDto) {
    return await this.userModel.create({ ...createContactDto });
  }

  async findAll() {
    return await this.userModel.findAll({ where: { deleted: false } });
  }

  async findOne(id: string) {
    return await this.userModel.findByPk(id);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const result = await this.userModel.update(
      { ...updateContactDto },
      { where: { id }, returning: true },
    );
    const contact = result?.[1]?.[0];
    if (contact) return contact;
    return this.userModel.findByPk(id);
  }

  remove(id: string) {
    return this.update(id, { deleted: true });
  }
}
