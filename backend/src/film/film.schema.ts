import { Schema, Document } from 'mongoose';

export const ScheduleSchema = new Schema({
  id: { type: String, required: true },
  daytime: { type: String, required: true },
  hall: { type: Number, required: true },
  rows: { type: Number, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  taken: { type: [String], default: [] },
});

export const FilmSchema = new Schema(
  {
    id: { type: String, required: true },
    rating: { type: Number, required: true },
    director: { type: String, required: true },
    tags: { type: [String], default: [] },
    title: { type: String, required: true },
    about: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    cover: { type: String, required: true },
    schedule: { type: [ScheduleSchema], default: [] },
  },
  { collection: 'films' },
);

export interface Film extends Document {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
  schedule: Session[];
}

export interface Session extends Document {
  id: string;
  film: string;
  daytime: string;
  day: string;
  time: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}
