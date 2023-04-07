import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { CreateSummaryDto, Summary } from './schemas/summary.schema';
import { OpenAIService } from 'src/openai/openai.service';

@Controller('summaries')
export class SummariesController {
  constructor(
    private readonly summariesService: SummariesService,
    private readonly openAIService: OpenAIService,
  ) {}

  @Post()
  async create(@Body() createSummaryDto: CreateSummaryDto) {
    const summary = await this.openAIService.getTextSummary(
      createSummaryDto.content,
    );
    console.log('content: ');
    console.log(createSummaryDto.content);
    console.log('summary: ');
    console.log(summary);
    createSummaryDto.summary = summary;

    return await this.summariesService.create(createSummaryDto);
  }

  @Get(':userId')
  async getSummaries(@Param() params): Promise<Summary[]> {
    return await this.summariesService.findAllForUser(params.userId);
  }
}
