import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenAIService } from './openai.service';
import { OpenAIController } from './openai.controller';

@Module({
  imports: [HttpModule],
  controllers: [OpenAIController],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
