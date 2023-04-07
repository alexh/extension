import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummariesController } from './summaries.controller';
import { SummariesService } from './summaries.service';
import { Summary, SummarySchema } from './schemas/summary.schema';
import { OpenAIModule } from 'src/openai/openai.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Summary.name, schema: SummarySchema }]),
    OpenAIModule,
  ],
  controllers: [SummariesController],
  providers: [SummariesService],
})
export class SummariesModule {}
