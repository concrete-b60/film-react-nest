import { BadRequestException, Injectable } from '@nestjs/common';

import { OrderDTO, OrderResultDTO } from './dto/order.dto';
import { randomUUID } from 'crypto';
import { ApiListResponse } from '../film/dto/films.dto';
import { TypeOrmOrderRepository } from '../repository/typeorm-order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly repo: TypeOrmOrderRepository) {}

  async orderTickets(
    order: OrderDTO,
  ): Promise<ApiListResponse<OrderResultDTO>> {
    const results: OrderResultDTO[] = [];

    for (const ticket of order.tickets) {
      try {
        const film = ticket.film.trim();
        const session = ticket.session.trim();

        const seatStr = `${ticket.row}:${ticket.seat}`;

        await this.repo.bookSeats(film, session, [seatStr]);

        const date = new Date(ticket.daytime);
        const day = date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: 'long',
        });
        const time = date.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });

        results.push({
          ...ticket,
          day,
          time,
          id: randomUUID(),
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
    return { total: results.length, items: results };
  }
}
