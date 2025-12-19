import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../film/entities/film.entity';
import { Repository } from 'typeorm';
import { GetFilmDTO, sessionDto } from '../film/dto/films.dto';
import { Schedule } from '../film/entities/schedule.entity';

@Injectable()
export class TypeOrmFilmRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
  ) {}

  async findAll(): Promise<GetFilmDTO[]> {
    const films = await this.filmRepo.find({
      relations: ['schedules'],
    });

    return films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags.split(','),
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedules.map((s) => this.mapSchedule(s, film.id)),
    }));
  }

  async findFilmSchedule(id: string): Promise<sessionDto[]> {
    const film = await this.filmRepo.findOne({
      where: { id },
      relations: ['schedules'],
    });

    if (!film) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }

    return film.schedules.map((s) => this.mapSchedule(s, film.id));
  }
  private mapSchedule(s: Schedule, filmId: string): sessionDto {
    const [day, time] = s.daytime.split('T');

    return {
      id: s.id,
      film: filmId,
      daytime: s.daytime,
      day,
      time,
      hall: s.hall,
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken ? s.taken.split(',') : [],
    };
  }
}
