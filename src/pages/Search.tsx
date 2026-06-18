import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router"
import type { movie } from "../components/Row";
import {key} from '../requests'


const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const keyword = searchParams.get('keyword');

  useEffect(() => {
    if (!keyword) return;

    const fetchMovies = async () => {
    await axios.get(`https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        api_key: key,
        query: keyword,
      },
    }  
    ).then((response) => {
      setMovies(response.data.results);
      console.log(movies);
    })
    }

    fetchMovies();
  }, [keyword])



  return (
    <>
    <div className='w-full h-screen'>
    <p className='absolute left-4 top-1/5 text-lg font-semibold text-gray-100'>Search results for: <span className="font-bold">{keyword}</span></p>
     <div className='absolute left-4 top-1/4 flex items-center group'>
       <div className='w-full h-full'>
         {movies.map((item: movie) => (
                    <Link className="w-40 sm:w-50 md:w-60 lg:w-70 p-2 inline-block relative" key={item.id} to={`/movie/${item.id}`}>
             <img className="w-full h-auto block" src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
              <div className='absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-black/80 text-white'>         
               <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
             </div>
           </Link>   
         ))}
       </div>
       </div>
       </div>
    </>
  )
}

export default Search