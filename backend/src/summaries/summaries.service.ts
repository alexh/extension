import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Summary, CreateSummaryDto } from './schemas/summary.schema';

@Injectable()
export class SummariesService {
  constructor(
    @InjectModel(Summary.name) private summaryModel: Model<Summary>,
  ) {}

  async create(createSummaryDto: CreateSummaryDto): Promise<Summary> {
    const createdSummary = new this.summaryModel({
      ...createSummaryDto,
      createdAt: new Date(),
    });
    return createdSummary.save();
  }

  async findAll(): Promise<Summary[]> {
    return this.summaryModel.find().exec();
  }

  async findAllForUser(userId: string): Promise<Summary[]> {
    return this.summaryModel.find({ userId: userId }).exec();
  }
}
