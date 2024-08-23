import { slideInFromTop } from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react'
import Movies from '../sub/MovieData';
import { fetchMovies } from '@/app/lib/data';



const FetchMovieData = async () => {

    const movies = await fetchMovies();
    return (
        <Movies moviesData={movies} />
    )

}

export default FetchMovieData
