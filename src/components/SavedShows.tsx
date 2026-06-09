import { useRef, useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import type { movie } from "./Row";
import { UserAuth } from "../context/AuthContext";
import {db} from '../firebase';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router";

const SavedShows = () => {
    const [movies, setMovies] = useState<movie[]>([]);
    const {user} = UserAuth();
    const sliderRef = useRef<HTMLDivElement>(null);

    const slideLeft = () => {
       const sliderElement = sliderRef.current;
       sliderElement!.scrollLeft -= 500;
    };

    const slideRight = () => {
        const sliderElement = sliderRef.current;
        sliderElement!.scrollLeft += 500;
    };

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc)=> {
           setMovies(doc.data()?.savedMovies); 
        })
    }, [user?.email]);

    const deleteShow = async (passedID : number) => {
        const movieRef = doc(db, 'users', `${user?.email}`)
        const result = movies.filter((item) => item.id !== passedID);
        try {
            await updateDoc(movieRef, {
                savedMovies: result,
            });
        } catch (error) {
            console.log(error);
        }
    };

  return (
   <div className='my-4 px-4'>
     <h2 className='text-white font-bold md:text-xl mb-4'>My Shows</h2>
     <div className='relative flex items-center group'>
         <MdChevronLeft onClick={slideLeft} className='bg-white rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
       <div ref={sliderRef} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-none'>
         {movies.map((item: movie, id) => (
           <div className="w-40 sm:w-50 md:w-60 lg:w-70 p-2 inline-block cursor-pointer relative">
             <div className='absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-black/80 text-white'>
               <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
               <p onClick={() => deleteShow(item.id)} className="absolute text-gray-300 top-4 right-4 hover:text-gray-500"><AiOutlineClose/></p>
             </div>   
          <Link key={id} to={`/movie/${item.id}`}>                      
             <img className="w-full h-auto block" src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
           </Link>
           </div>

         ))}
       </div>
         <MdChevronRight onClick={slideRight} className='bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
     </div>
   </div>
  )
}

export default SavedShows