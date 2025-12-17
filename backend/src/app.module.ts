import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { configProvider } from './app.config.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmModule } from './film/film.module';
import { OrderModule } from './order/order .module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/afisha',
    ),
    FilmModule,
    OrderModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
