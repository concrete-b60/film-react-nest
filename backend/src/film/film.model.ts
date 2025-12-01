import { model } from 'mongoose';
import { FilmSchema } from './film.schema';

export const FilmModel = model('Film', FilmSchema);
