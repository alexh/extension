import { Body, Controller, Post } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post()
  async summarize(@Body() summaryRequest: { content: string }) {
    const summary = await this.openAIService.getTextSummary(
      summaryRequest.content,
    );
    console.log(summary);
    return await this.openAIService.getTextSummary(summaryRequest.content);
  }
}
