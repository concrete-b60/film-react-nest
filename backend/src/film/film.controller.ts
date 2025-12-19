import { Controller, Get, Param } from '@nestjs/common';
import { FilmService } from './film.service';
import { Film } from './entities/film.entity';

@Controller('films')
export class FilmController {
  constructor(private readonly service: FilmService) {}
  @Get()
  async getAll(): Promise<{ items: Film[] }> {
    return this.service.getAllFilms();
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    return this.service.getSchedule(id);
  }
}
