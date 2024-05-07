import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactDto } from './dto/contact.dto';
import { ApiDefaultResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @ApiOperation({ summary: 'Get all contacts' })
  @ApiOkResponse({
    type: [ContactDto],
  })
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @ApiOkResponse({
    type: ContactDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @ApiOkResponse({
    type: ContactDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @ApiDefaultResponse({
    type: ContactDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
