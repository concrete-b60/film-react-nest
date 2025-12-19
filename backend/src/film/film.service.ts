import { Injectable } from '@nestjs/common';

import { ApiListResponse, GetFilmDTO, sessionDto } from './dto/films.dto';
import { TypeOrmFilmRepository } from '../repository/typeorm-film.repository';

@Injectable()
export class FilmService {
  constructor(private readonly repo: TypeOrmFilmRepository) {}

  async getAllFilms(): Promise<ApiListResponse<GetFilmDTO>> {
    const films = await this.repo.findAll();
    return { total: films.length, items: films };
  }

  async getFilmSchedule(id: string): Promise<ApiListResponse<sessionDto>> {
    const sessions = await this.repo.findFilmSchedule(id);
    return {
      total: sessions.length,
      items: sessions,
    };
  }
}
