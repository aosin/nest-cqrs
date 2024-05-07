import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
    }),
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
