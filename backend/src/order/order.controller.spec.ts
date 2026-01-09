import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

describe('FilmController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const orderServiceMock = {
    orderTickets: jest.fn(),
  };

  const createOrderMock: OrderDTO = {
    email: '123@ya.ru',
    phone: '+7(888)888-88-88',
    tickets: [
      {
        film: 'Архитекторы общества',
        session: 'Morning Session',
        daytime: '2024-06-28T10:00:53+03:00',
        day: '2024-06-28',
        time: '10:00',
        row: 2,
        seat: 1,
        price: 10,
      },
    ],
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(orderServiceMock)
      .compile();
    orderController = app.get<OrderController>(OrderController);
    orderService = app.get<OrderService>(OrderService);
  });

  it('.getAll() should call getAll method of the service', () => {
    orderController.createOrder(createOrderMock);

    expect(orderService.orderTickets).toHaveBeenCalledWith(createOrderMock);
  });
});
