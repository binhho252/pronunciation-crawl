import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pronunciation } from './pronunciation/pronunciation.entity';
import { PronunciationModule } from './pronunciation/pronunciation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'pronunciation_db',
      entities: [Pronunciation],
      synchronize: true,  // Tự động tạo bảng nếu chưa có
    }),
    PronunciationModule,
  ],
})
export class AppModule {}
