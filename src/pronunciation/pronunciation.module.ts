import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pronunciation } from './pronunciation.entity';
import { PronunciationService } from './pronunciation.service';
import { PronunciationController } from './pronunciation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pronunciation])],
  providers: [PronunciationService],
  controllers: [PronunciationController],
})
export class PronunciationModule {}
