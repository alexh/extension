import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumberString, IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type SummaryDocument = HydratedDocument<Summary>;

@Schema()
export class Summary {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  summary: string;

  @Prop()
  title: string;

  @Prop()
  url: string;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);

export class CreateSummaryDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  url: string;

  title: string;

  summary: string;
}
