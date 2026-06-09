import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {key} from '../requests';

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
const Watch = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const { id } = useParams();
    const embedUrl = `https://www.2embed.cc/embed/${id}`;
        
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}popular?api_key=${key}`).then((response) => {
           const fetchedMovie = response.data;
            console.log(fetchedMovie);
            setMovie(fetchedMovie);
        });
    }, [id]);

  return (
  <>
    <div className="flex flex-col items-center relative mb-2">
     <Link className="fixed top-2 left-2" to='/'>
            <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl text-blue-500'>ColdPlay</h1>
     </Link>           
        <div className="w-full h-screen">
            <iframe className="w-full h-full aspect-video" src={embedUrl} height='100%' width='100%' allowFullScreen={true}></iframe>
            <h1 className="text-white text-2xl font-bold absolute top-3 right-3">{movie?.title}</h1>
        </div>
    </div>
  </>

  )
}

export default Watch