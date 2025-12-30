import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('FilmController', () => {
  let filmController: FilmController;
  let filmService: FilmService;

  const filmServiceMock = {
    getAllFilms: jest.fn(),
    getSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FilmController],
      providers: [FilmService],
    })
      .overrideProvider(FilmService)
      .useValue(filmServiceMock)
      .compile();
    filmController = app.get<FilmController>(FilmController);
    filmService = app.get<FilmService>(FilmService);
  });

  it('.getAll() should call getAll method of the service', () => {
    filmController.getAll();

    expect(filmService.getAllFilms).toHaveBeenCalled();
  });

  it('.getSchedule() should call getSchedule method of the service', () => {
    filmController.getSchedule('filmId-1');

    expect(filmService.getSchedule).toHaveBeenCalledWith('filmId-1');
  });
});
