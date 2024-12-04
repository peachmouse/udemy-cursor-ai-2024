export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  genreIds: number[];
}

export interface MovieDetails extends Movie {
  genres: {
    id: number;
    name: string;
  }[];
  actors: {
    id: number;
    name: string;
  }[];
  directors: {
    id: number;
    name: string;
  }[];
}
