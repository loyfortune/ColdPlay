//import React from 'react'
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import  Movie from './Movie';

type RowProps = {
    title: string;
    fetchURL: string;
}

export type movie = {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        img: string;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        softcore: boolean;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
}

const Row = ({ title, fetchURL }: RowProps) => {
    const [movies, setMovies] = useState([]);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results);
        })
    }, [fetchURL]);

    const slideLeft = () => {
       const sliderElement = sliderRef.current;
       sliderElement!.scrollLeft -= 500;
    }

    const slideRight = () => {
        const sliderElement = sliderRef.current;
        sliderElement!.scrollLeft += 500;
    }

  return (
   <div className='my-4 px-4'>
     <h2 className='text-white font-bold md:text-xl mb-4'>{title}</h2>
     <div className='relative flex items-center group'>
         <MdChevronLeft onClick={slideLeft} className='bg-white rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
       <div ref={sliderRef} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-none'>
         {movies.map((item: movie, id) => (
            <Movie key={id} item={item} />
         ))}
       </div>
         <MdChevronRight onClick={slideRight} className='bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
     </div>
   </div>
  )
}

export default Row