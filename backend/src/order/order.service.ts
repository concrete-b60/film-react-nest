import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { OrderDTO, OrderResultDTO } from './dto/order.dto';

import { ApiListResponse } from '../film/dto/films.dto';

@Injectable()
export class OrderService {
  constructor(private readonly repo: OrderRepository) {}

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
          id: crypto.randomUUID(),
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
    return { total: results.length, items: results };
  }
}
