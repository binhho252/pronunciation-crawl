import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pronunciation } from './pronunciation.entity';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PronunciationService {
  constructor(
    @InjectRepository(Pronunciation)
    private pronunciationRepository: Repository<Pronunciation>,
  ) {}

  async getPronunciation(word: string) {
    // Kiểm tra nếu từ đã tồn tại trong database
    const existingPronunciation = await this.pronunciationRepository.findOne({ where: { word } });
    if (existingPronunciation) {
      return existingPronunciation.data;
    }

    // Nếu chưa có trong database, tiến hành crawl dữ liệu
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www.google.com/search?q=${word}+pronunciation`);

    // Crawl syllables and pronunciation data
    const pronunciationData = await page.evaluate(() => {
      const syllables = [];
      const images = [];

      // Lấy các âm tiết và thời lượng phát âm (dựa trên selector cụ thể)
      const syllableEls = document.querySelectorAll('.syllable-class'); // Chỉnh lại selector cho phù hợp
      syllableEls.forEach((el: any) => {
        syllables.push({
          syllable: el.textContent,
          duration: el.getAttribute('data-duration'),
        });
      });

      // Lấy các hình ảnh minh họa phát âm (nếu có)
      const imageEls = document.querySelectorAll('.image-class'); // Chỉnh lại selector cho phù hợp
      imageEls.forEach((el: any) => {
        images.push({
          image_url: el.getAttribute('src'),
          duration: el.getAttribute('data-duration'),
        });
      });

      return { syllables, images };
    });

    await browser.close();

    // Lưu dữ liệu vào database
    const newPronunciation = this.pronunciationRepository.create({
      word,
      data: pronunciationData,
      createdAt: new Date(),
    });

    await this.pronunciationRepository.save(newPronunciation);

    return pronunciationData;
  }
}
