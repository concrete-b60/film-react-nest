export class GetFilmDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
  schedule: sessionDto[];
}

export class sessionDto {
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

export type ApiListResponse<Type> = {
  total: number;
  items: Type[];
};
