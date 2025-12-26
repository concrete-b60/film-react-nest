import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../film/entities/film.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../film/entities/schedule.entity';

@Injectable()
export class TypeOrmFilmRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
  ) {}

  async findAll(): Promise<Film[]> {
    return await this.filmRepo.find();
  }

  async findSchedule(filmId: string): Promise<Schedule[]> {
    const film = await this.filmRepo.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });

    return film.schedule;
  }
}
