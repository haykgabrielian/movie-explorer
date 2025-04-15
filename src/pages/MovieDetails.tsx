import React, { useState } from 'react';
import styled from 'styled-components';
import {Link, useParams} from '@tanstack/react-router';

import { MovieDetailsRoute } from '@/routes';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { getPosterUrl } from '@/helpers/imageHelpers';

import RightArrowIcon from '@/assets/right.png';
import LeftArrowIcon from '@/assets/left.png';

const Container = styled.div`
    padding-top: 70px;
`;

const Details = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

const ImageContainer = styled.div`
    display: flex;
    width: 300px;
    height: auto;
    margin-right: 60px;
`;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 60%;
    max-width: 800px;
`;

const Genres = styled.div`
    display: flex;
    gap: 10px;
`;

const GenreItem = styled.div`
    padding: 10px;
    background: #777;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
`;


const Section = styled.div`
    margin-top: 30px;
    text-align: left;
`;

const SectionTitle = styled.h3`
    margin-bottom: 7px;
`;

const CastList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
`;

const CastCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ActorName = styled.p`
    font-weight: bold;
    font-size: 14px;
`;

const CharacterName = styled.p`
    margin-top: 5px;
    font-size: 14px;
    color: #aaa;
`;

const TrailerSlider = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const ArrowButton = styled.button<{ direction: 'left' | 'right' }>`
    position: relative;
    height: 40px;
    width: 40px;
    padding: 0;
    background-color: #777;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    background-image: ${({direction}) =>
            direction === 'left' ? `url(${LeftArrowIcon})` : `url(${RightArrowIcon})`};
    background-size: 18px auto;
    background-position: center;
    background-repeat: no-repeat;

    &:hover {
        background-color: #666;
    }
`;

const VideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TrailerTitle = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #aaa;
`;

const StyledLink = styled(Link)`
    position: absolute;
    top: 20px;
    left: 20px;
`;


const MovieDetails = () => {

    const [currentTrailer, setCurrentTrailer] = useState(0);

    const nextTrailer = () => {
        setCurrentTrailer((prev) => (prev + 1) % videos.length);
    };

    const prevTrailer = () => {
        setCurrentTrailer((prev) => (prev - 1 + videos.length) % videos.length);
    };

    const { movieId } = useParams({ from: MovieDetailsRoute.id });
    const movieIdNum = parseInt(movieId);

    const { movie, credits, videos, isLoading, isError } = useMovieDetails(movieIdNum);

    if (isError) return <p>Error loading movie</p>;
    if (!movie) return <p>Movie not found</p>;

    return (
        <Container>
            <StyledLink to="/">Back</StyledLink>
            {isLoading ? <p>Loading movie details...</p> :
                <Details>
                    <ImageContainer>
                        <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
                    </ImageContainer>
                    <DetailsContainer>
                        <h1>{movie.title}</h1>
                        <Section>
                            <SectionTitle>Overview:</SectionTitle>
                            <p>{movie.overview}</p>
                        </Section>
                        <Section>
                            <SectionTitle>Genres:</SectionTitle>
                            <Genres>
                                {movie.genres.map((genre) => (
                                    <GenreItem key={genre.id}>
                                        {genre.name}
                                    </GenreItem>
                                ))}
                            </Genres>
                        </Section>
                        <Section>
                            <SectionTitle>Release Date:</SectionTitle>
                            <p>{movie.release_date}</p>
                        </Section>
                        {credits?.cast != null && credits?.cast.length > 0 && (
                            <Section>
                                <SectionTitle>Top Cast:</SectionTitle>
                                <CastList>
                                    {credits?.cast.slice(0, 10).map(actor => (
                                        <CastCard key={actor.id}>
                                            <ActorName>{actor.name}</ActorName>
                                            <CharacterName>{actor.character}</CharacterName>
                                        </CastCard>
                                    ))}
                                </CastList>
                            </Section>
                        )}
                        {videos.length > 0 && (
                            <Section>
                                <SectionTitle>Trailers:</SectionTitle>
                                <TrailerSlider>
                                    {videos.length === 1 ? null : <ArrowButton direction="left" onClick={prevTrailer} />}
                                    <VideoWrapper>
                                        <iframe
                                            width="400"
                                            height="225"
                                            src={`https://www.youtube.com/embed/${videos[currentTrailer].key}`}
                                            title={videos[currentTrailer].name}
                                        />
                                        <TrailerTitle>{videos[currentTrailer].name}</TrailerTitle>
                                    </VideoWrapper>
                                    {videos.length === 1 ? null : <ArrowButton direction="right" onClick={nextTrailer} />}
                                </TrailerSlider>
                            </Section>
                        )}
                    </DetailsContainer>
                </Details>
            }
        </Container>
    );
};

export default MovieDetails;
