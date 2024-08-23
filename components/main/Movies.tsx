import { slideInFromTop } from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react'
import { fetchMovies } from '@/app/lib/data';
import { MovieData } from '../sub/MovieData';



const FetchMovieData = async () => {

    const movies = await fetchMovies();
    return (
        <MovieData moviesData={movies} />
    )

}

export default FetchMovieData
