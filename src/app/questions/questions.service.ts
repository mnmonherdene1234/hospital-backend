import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from 'src/schemas/question.schema';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.schemaName)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  async create(dto: QuestionDto) {
    return await new this.questionModel(dto).save();
  }

  async findAll() {
    return await this.questionModel
      .find()
      .populate(['created_by', 'updated_by'])
      .sort('-created_by');
  }

  async findOne(id: string) {
    return await this.questionModel
      .findById(id)
      .populate(['created_by', 'updated_by']);
  }

  async update(id: string, dto: QuestionDto) {
    return await this.questionModel.findByIdAndUpdate(id, { ...dto });
  }

  async remove(id: string) {
    return await this.questionModel.findByIdAndDelete(id);
  }
}
