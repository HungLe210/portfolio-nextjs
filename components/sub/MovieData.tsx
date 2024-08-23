
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { slideInFromTop } from '@/utils/motion'
import Image from 'next/image'
import { Movie } from '../../app/lib/data'

interface MovieDataProps {
    movies: Movie[]
}

export const Movies = ({ moviesData }: { moviesData: Movie[] }) => (
    <motion.div
        initial="hidden"
        animate="visible"
        className='flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]'
    >
        <motion.div
            variants={slideInFromTop}
            id='movies'
            className='flex flex-col items-center justify-center py-20'
        >

            <h1 className='text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-200 py-20'>My Favorite Movies</h1>
            <div className='h-full w-full flex flex-col flex-wrap md:flex-row justify-center items-center gap-20 px-10'>
                {moviesData.map((movie: any) => {
                    return (
                        <div
                            key={movie.id} // Add a unique key prop for each movie
                            className='relative w-72 h-96 rounded-lg shadow-lg border border-[#2A0E61]'
                        >
                            <Image
                                src="/Poster.jpg"
                                alt=""
                                fill
                                style={{ objectFit: 'cover' }} // Adjust as needed
                                className='relative inset-0 rounded-lg'
                            />
                            <h1 className='absolute left-1/2 transform -translate-x-1/2 top-[-2.5rem] text-3xl font-semibold text-purple-300 text-center z-10'>{movie.title}</h1>
                            <div className='absolute inset-0 p-4 flex flex-col justify-end bg-black bg-opacity-50'>
                                <p className='mt-2 text-gray-300 text-center text-cyan-200'>{movie.plot}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </motion.div >
    </motion.div>
)


export default Movies;