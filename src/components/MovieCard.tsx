import React from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

import { MovieDetailsRoute } from '@/routes';
import { getPosterUrl } from '@/helpers/imageHelpers';
import { Movie } from '@/types/movie';

const MovieItem = styled.div`
    position: relative;
    width: 300px;
    text-align: left;
`;

const Poster = styled.img`
    width: 100%;
`;

const MovieInfo = styled.span`
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #cccccc;
`;

const MovieTitle = styled.span`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 10px 0;
`;

const Title = styled.h2`
    font-size: 20px;
    width: 80%;
    overflow: hidden;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const VoteAverage = styled.p`
    margin-left: 10px;
    color: yellow;
`;

const FavoriteButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

type MovieCardProps = {
    movie: Movie;
    isFavorite: boolean;
    onToggleFavorite: (movieId: number) => void;
};

const MovieCard = ({ movie, isFavorite, onToggleFavorite }: MovieCardProps) => {
    return (
        <MovieItem>
            <Poster src={getPosterUrl(movie.poster_path)} alt={movie.title} />
            <MovieInfo>
                <MovieTitle>
                    <Title>{movie.title} ({movie.release_date.slice(0, 4)})</Title>
                    <VoteAverage>{`★ ${movie.vote_average.toFixed(1)}`}</VoteAverage>
                </MovieTitle>
                <Link to={MovieDetailsRoute.to} params={{ movieId: `${movie.id}` }}>
                    More Details
                </Link>
                <FavoriteButton onClick={() => onToggleFavorite(movie.id)}>
                    {isFavorite ? "★ Remove Favorite" : "☆ Add Favorite"}
                </FavoriteButton>
            </MovieInfo>
        </MovieItem>
    );
};

export default MovieCard;
