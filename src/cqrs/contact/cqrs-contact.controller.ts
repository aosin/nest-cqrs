import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddContactDto } from './dto/add-contact.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddContactCommand } from './commands/add-contact.command';
import { GetAllContactsQuery } from './queries/get-all-contacts.query';
import { GetContactDto } from './dto/get-contact.dto';
import { GetCountersQuery } from './queries/get-counters.query';
import { CountersDto } from './dto/counters.dto';

@ApiTags('contacts/cqrs')
@UsePipes(new ValidationPipe())
@Controller('cqrs/contacts')
export class CqrsContactController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOkResponse({ type: null })
  @ApiOperation({ summary: 'Create a contact' })
  @Post()
  async create(@Body() createContactDto: AddContactDto) {
    await this.commandBus.execute(
      new AddContactCommand(createContactDto.name, createContactDto.tags),
    );
  }

  @ApiOperation({ summary: 'Get all contacts' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [GetContactDto],
  })
  @Get()
  async findAll() {
    return (await this.queryBus.execute(new GetAllContactsQuery())).map(
      (contact) => GetContactDto.fromEntity(contact),
    );
  }

  @ApiOperation({ summary: 'Get counters' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: CountersDto,
  })
  @Get('/counters')
  async getCounters() {
    return CountersDto.fromCollection(
      await this.queryBus.execute(new GetCountersQuery()),
    );
  }
}
