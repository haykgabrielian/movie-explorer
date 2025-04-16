import { Movies, MovieDetails, Genres, Credits, Videos } from '@/types/movie';

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const getHeaders = () => ({
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
});

export const fetchMovies = async (
    query: string | null = null,
    page: number = 1,
    genreIds: number[] = []
): Promise<Movies> => {
    let url: string;
    if (query) {
        url = `${baseUrl}/search/movie?query=${query}&page=${page}`;
    } else {
        const genreParam = genreIds.length ? `&with_genres=${genreIds.join(',')}` : '';
        url = `${baseUrl}/discover/movie?page=${page}${genreParam}`;
    }

    const response = await fetch(url, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch movies');
    return await response.json();
};

export const fetchMovieById = async (movieId: number): Promise<MovieDetails> => {
    const response = await fetch(`${baseUrl}/movie/${movieId}`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to fetch movie with ID: ${movieId}`);
    return await response.json();
};

export const fetchGenres = async (): Promise<Genres> => {
    const response = await fetch(`${baseUrl}/genre/movie/list?language=en`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch genres');
    return await response.json();
};

export const fetchMovieCredits = async (movieId: number): Promise<Credits> => {
    const response = await fetch(`${baseUrl}/movie/${movieId}/credits`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to fetch credits for movie ID: ${movieId}`);
    return await response.json();
};

export const fetchMovieVideos = async (movieId: number): Promise<Videos> => {
    const response = await fetch(`${baseUrl}/movie/${movieId}/videos`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to fetch videos for movie ID: ${movieId}`);
    return await response.json();
};
