import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Contact } from './entities/contact.entity';

@ApiTags('contacts/crud')
@UsePipes(new ValidationPipe())
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Create a contact' })
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @ApiOperation({ summary: 'Get all contacts' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [Contact],
  })
  @Get()
  async findAll() {
    return this.contactService.findAll();
  }

  @ApiOperation({ summary: 'Get a contact by id' })
  @ApiOkResponse({
    type: Contact,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const contact = await this.contactService.findOne(id);
    if (!contact) throw new NotFoundException(`Could not find contact: ${id}`);
    return contact;
  }

  @ApiOperation({ summary: 'Update a contact' })
  @ApiOkResponse({
    type: Contact,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const contact = await this.contactService.update(id, updateContactDto);
    if (!contact) throw new NotFoundException(`Could not find contact: ${id}`);
    return contact;
  }

  @ApiOperation({ summary: 'Delete a contact' })
  @ApiOkResponse({
    type: Contact,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const contact = await this.contactService.remove(id);
    if (!contact) throw new NotFoundException(`Could not find contact: ${id}`);
    return contact;
  }
}
