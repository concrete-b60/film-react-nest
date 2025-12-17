import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';

@Module({
  imports: [RepositoryModule],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
