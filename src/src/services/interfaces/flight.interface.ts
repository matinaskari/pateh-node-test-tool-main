export interface Flight {
  provider: string;
  origin: string;
  destination: string;
  departure_date: string;
  returning_date?: string;
  type: string;
}
