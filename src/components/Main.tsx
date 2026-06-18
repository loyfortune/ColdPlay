import { useEffect, useState } from 'react';
import request from '../requests';
import axios from 'axios';
import { Link } from 'react-router';

const Main = () => {
    interface Movie {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
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

    const [movie, setMovie] = useState<Movie | null>(null);
    
    useEffect(() => {
        axios.get(request.requestPopular).then((response) => {
           const fetchedMovies = response.data.results;

            const randomIndex = Math.floor(Math.random() * fetchedMovies.length);

            setMovie(fetchedMovies[randomIndex]);
        });
    }, []);
    //console.log(movie);

    const truncateString = (str: string, num: number) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '. . .';
    };

    return (
        <div key={movie?.id} className='w-full h-137.5 text-white'>
            <div className='w-full h-full'>
                <div className='absolute w-full h-137.5 bg-linear-to-r from-black'></div>
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} />
                <div className='absolute w-full top-1/5 p-2 sm:p-4 md:p-8'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>{movie?.title}</h1>
                    <div className='flex items-center gap-2 sm:gap-4 my-2 sm:my-4'>
                        <Link to={`/movie/${movie?.id}`}>
                            <button className='bg-gray-200 text-black cursor-pointer py-1 px-3 sm:py-2 sm:px-5 rounded-[1px]'>Play</button>
                        </Link>
                        <button className='bg-transparent border border-white cursor-pointer py-1 px-3 sm:py-2 sm:px-5 rounded-[1px]'>Watch Later</button>
                    </div>
                    <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
                    <p className='w-full text-gray-200 mt-2 sm:mt-3 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%]'>{truncateString(movie?.overview || '', 150)}</p>
                </div>
            </div>
        </div>
    )
}

export default Main