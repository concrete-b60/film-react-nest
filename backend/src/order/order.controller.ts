import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO, OrderResultDTO } from './dto/order.dto';
import { ApiListResponse } from '../film/dto/films.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}
  @Post()
  createOrder(
    @Body() order: OrderDTO,
  ): Promise<ApiListResponse<OrderResultDTO>> {
    return this.service.orderTickets(order);
  }
}
