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
