import Movies from '@/components/main/Movies';

import ProjectCard from '@/components/sub/ProjectCard';
import React from 'react'
import { useGlobalContext } from '@/context/global';




export default function About() {

    const g = useGlobalContext;
    console.log(g);


    return (
        <div className='custom'>
            <div className='bg-black text-white text-2xl'></div>

            <Movies />

        </div>

    )
}
