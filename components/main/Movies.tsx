import { slideInFromTop } from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react'
import Movies from '../sub/MovieData';


export interface Movie {
    id: number;
    title: string;
    year: number;
    genre: string[];
    rating: number;
    director: string;
    actors: string[];
    description: string;
    awards: string;
    country: string[];
}


async function fetchMovies(): Promise<Movie[]> {
    try {
        const response = await fetch("https://freetestapi.com/api/v1/movies?limit=5");
        const data = await response.json();

        const movieData: Movie[] = data.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            year: movie.year,
            genre: movie.genre,
            rating: movie.rating,
            director: movie.director,
            actors: movie.actors,
            plot: movie.plot, // Assuming "plot" is the description
            awards: movie.awards,
            country: movie.country
        }));

        return movieData;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}
const FetchMovieData = async () => {

    const movies = await fetchMovies();
    return (
        <Movies moviesData={movies} />
    )

}

export default FetchMovieData
