import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmFilmRepository } from './typeorm-film.repository';
import { TypeOrmOrderRepository } from './typeorm-order.repository';
import { Film } from '../film/entities/film.entity';
import { Schedule } from '../film/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  providers: [TypeOrmFilmRepository, TypeOrmOrderRepository],
  exports: [TypeOrmFilmRepository, TypeOrmOrderRepository],
})
export class RepositoryModule {}
