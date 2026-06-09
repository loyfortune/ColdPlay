//import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import type { movie } from './Row';
import { useState } from 'react';
import {UserAuth} from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router';

type MovieProps = {
    item: movie;
}

const Movie = ({ item }: MovieProps) => {
        const [like, setLike] = useState(false);
        const [saved, setSaved] = useState(false);
        const { user } = UserAuth();

        const movieID = doc(db, 'users', `${user?.email}`);

        const saveMovie = async () => {
          if (user?.email) {
            setLike(!like);
            setSaved(!saved);

           await updateDoc(movieID, {
              savedMovies: arrayUnion({
                id: item.id,
                title: item.title,
                img: item.backdrop_path
              }),
            })
          } else {
            alert('Please log in to save a movie');
          }
        }
        
  return (

          <Link className="w-40 sm:w-50 md:w-60 lg:w-70 p-2 inline-block relative" key={item.id} to={`/movie/${item.id}`}>
             <img className="w-full h-auto block" src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
              <div className='absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-black/80 text-white'>
              <i onClick={saveMovie} className='absolute top-4 left-4 text-gray-300 cursor-pointer'>{like ? <FaHeart /> : <FaRegHeart />}</i>             
               <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
             </div>
           </Link> 

  )
}

export default Movie
