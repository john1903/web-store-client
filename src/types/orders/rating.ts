export interface Rating {
  id: string;
  rating: number;
  description: string;
}

export interface RatingRequest {
  id?: number;
  rating: number;
  description: string;
}
