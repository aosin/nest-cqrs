import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactModule } from './crud/contact/contact.module';
import { CqrsContactModule as CqrsContactModule } from './cqrs/contact/cqrs-contact.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      autoLoadModels: true,
      synchronize: true,
    }),
    ContactModule,
    CqrsContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
