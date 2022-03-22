import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BiosController } from './bios.controller';
import { BiosModel } from './bios.model';
import { BiosService } from './bios.service';

@Module({
  controllers: [BiosController],
  providers: [BiosService],
  imports:[
      SequelizeModule.forFeature([BiosModel])
  ]
})
export class BiosModule {}
