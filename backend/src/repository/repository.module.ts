import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmRepository } from './film.repository';
import { FilmSchema } from '../film/film.schema';
import { OrderRepository } from './order.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])],
  providers: [FilmRepository, OrderRepository],
  exports: [FilmRepository, OrderRepository],
})
export class RepositoryModule {}
