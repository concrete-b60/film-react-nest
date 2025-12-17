export class TicketDTO {
  film: string;
  session: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
}

export class ContactsDTO {
  email: string;
  phone: string;
}

export class OrderDTO extends ContactsDTO {
  tickets: TicketDTO[];
}

export class OrderResultDTO extends TicketDTO {
  id: string;
}
