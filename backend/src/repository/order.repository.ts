import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from '../film/film.schema';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel('Film') private readonly filmModel: Model<Film>) {}
  async findFilmSession(filmId: string, sessionId: string) {
    const film = await this.filmModel.findOne({ id: filmId });
    if (!film) throw new NotFoundException(`Film with id ${filmId} not found.`);

    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session)
      throw new NotFoundException(`Session with id ${sessionId} not found.`);

    return { film, session };
  }

  async bookSeats(filmId: string, sessionId: string, seats: string[]) {
    const { film, session } = await this.findFilmSession(filmId, sessionId);

    for (const seat of seats) {
      if (session.taken.includes(seat)) {
        throw new NotFoundException(`Seat ${seat} is already taken`);
      }
      session.taken.push(seat);
    }

    await film.save();
    return seats;
  }
}
