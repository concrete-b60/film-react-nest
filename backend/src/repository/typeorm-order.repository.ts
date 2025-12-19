import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../film/entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmOrderRepository {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}
  async findFilmSession(filmId: string, sessionId: string) {
    const session = await this.scheduleRepo.findOne({
      where: {
        id: sessionId,
        film: { id: filmId },
      },
      relations: ['film'],
    });
    if (!session) throw new NotFoundException();

    return {
      film: session.film,
      session: {
        ...session,
        taken: session.taken.split(','),
      },
    };
  }

  async bookSeats(filmId: string, sessionId: string, seats: string[]) {
    const { session } = await this.findFilmSession(filmId, sessionId);
    const taken = session.taken;

    for (const seat of seats) {
      if (taken.includes(seat)) {
        throw new NotFoundException(`Seat ${seat} is already taken`);
      }
      taken.push(seat);
    }

    await this.scheduleRepo.update(sessionId, {
      taken: taken.join(','),
    });

    return seats;
  }
}
