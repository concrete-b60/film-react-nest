import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from '../film/film.schema';

@Injectable()
export class FilmRepository {
  constructor(@InjectModel('Film') private readonly filmModel: Model<Film>) {}

  async findAll() {
    return this.filmModel.find().lean();
  }

  async findFilmSchedule(id: string) {
    return this.filmModel.findOne({ id }).lean();
  }
}
