import { Injectable } from '@nestjs/common';
import { Film } from './entities/film.entity';
import { ApiListResponse } from './dto/films.dto';
import { TypeOrmFilmRepository } from '../repository/typeorm-film.repository';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmService {
  constructor(private readonly repo: TypeOrmFilmRepository) {}

  async getAllFilms(): Promise<ApiListResponse<Film>> {
    const films = await this.repo.findAll();
    return { total: films.length, items: films };
  }

  async getSchedule(filmId: string): Promise<ApiListResponse<Schedule>> {
    const schedule = await this.repo.findSchedule(filmId);
    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
