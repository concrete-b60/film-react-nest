import { Controller, Get, Param } from '@nestjs/common';
import { GetFilmDTO } from './dto/films.dto';
import { FilmService } from './film.service';

@Controller('films')
export class FilmController {
  constructor(private readonly service: FilmService) {}
  @Get()
  async getAll(): Promise<{ items: GetFilmDTO[] }> {
    return this.service.getAllFilms();
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    return this.service.getFilmSchedule(id);
  }
}
