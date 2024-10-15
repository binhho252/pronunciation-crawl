import { Controller, Get, Query } from '@nestjs/common';
import { PronunciationService } from './pronunciation.service';

@Controller('pronunciation')
export class PronunciationController {
  constructor(private readonly pronunciationService: PronunciationService) {}

  @Get()
  async getPronunciation(@Query('word') word: string) {
    const data = await this.pronunciationService.getPronunciation(word);
    return {
      code: 200,
      message: 'success',
      data: data,
    };
  }
}
