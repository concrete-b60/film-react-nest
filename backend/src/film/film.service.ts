import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../repository/film.repository';
import { ApiListResponse, GetFilmDTO, sessionDto } from './dto/films.dto';

@Injectable()
export class FilmService {
  constructor(private readonly repo: FilmRepository) {}

  async getAllFilms(): Promise<ApiListResponse<GetFilmDTO>> {
    const films = await this.repo.findAll();
    return { total: films.length, items: films };
  }

  async getFilmSchedule(id: string): Promise<ApiListResponse<sessionDto>> {
    const film = await this.repo.findFilmSchedule(id);
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
