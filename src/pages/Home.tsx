import React, {useEffect, useState, useCallback } from 'react';
import styled from "styled-components";

import Header from "@/components/Header";
import Sidebar from '@/components/Sidebar';
import MovieCard from '@/components/MovieCard';

import { useMovies } from '@/hooks/useMovies';
import { Movie } from '@/types/movie';


const Container = styled.div`
    padding: 70px 0;
`;

const Movies = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 50px;
`;

const Home = () => {

    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const { data, isLoading, error } = useMovies(debouncedQuery, 1, selectedGenres);

    useEffect(() => {
        const storedIds = localStorage.getItem("favoriteMovieIds");
        if (storedIds && storedIds.length > 0) {
            setFavoriteIds(JSON.parse(storedIds));
        }
    }, []);

    useEffect(() => {
        if (query !== debouncedQuery) {
            const handler = setTimeout(() => {
                setDebouncedQuery(query);
            }, 800);
            return () => clearTimeout(handler);
        }
    }, [query, debouncedQuery]);

    const handleSidebarToggle = () => setIsSidebarOpen(prev => !prev);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }, []);

    const handleSearchClear = useCallback(() => {
        setQuery("");
    }, []);

    const handleGenreToggle = useCallback((genreId: number) => {
        setSelectedGenres(prev =>
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
    }, []);

    const handleGenreClear = useCallback(() => {
        setSelectedGenres([]);
    }, []);

    const toggleFavorite = (movieId: number) => {
        setFavoriteIds(prev => {
            const updated = prev.includes(movieId)
                ? prev.filter(id => id !== movieId)
                : [...prev, movieId];
            localStorage.setItem("favoriteMovieIds", JSON.stringify(updated));
            return updated;
        });
    };

    if (error) return <p>Error loading movies</p>;

    return (
        <Container>
            <Header
                menuOpen={isSidebarOpen}
                query={query}
                handleSearchChange={handleSearchChange}
                handleSearchClear={handleSearchClear}
                handleSidebarToggle={handleSidebarToggle}
            />
            <Sidebar
                sidebarOpen={isSidebarOpen}
                selectedGenres={selectedGenres}
                onToggleGenre={handleGenreToggle}
                handleGenreClear={handleGenreClear}
            />
            {
                isLoading ? <p>Loading movies...</p> :
                    <Movies>
                        {data?.results.length === 0 ? (
                            <p>No movies found.</p>
                        ) : (
                            data?.results.map((movie: Movie) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    isFavorite={favoriteIds.includes(movie.id)}
                                    onToggleFavorite={toggleFavorite}
                                />
                            ))
                        )}
                    </Movies>
            }
        </Container>
    );
};

export default Home;
