import { Link, useNavigate } from "react-router"
import { UserAuth } from '../context/AuthContext';
import { useState } from "react";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = UserAuth();
    const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
        await signUp(email, password);
        navigate('/');
        } catch (error){
            console.log(error);
        }
    }

  return (
    <div className='w-full h-screen'>
        <img className='absolute w-full h-full object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/435e8bb8-7f1b-49cb-8da8-bff997124294/web/NG-en-20260511-TRIFECTA-perspective_1fe8a025-7c55-4a17-9574-0bf28be6b40b_large.jpg' alt='/'></img>
        <div className='fixed top-0 left-0 w-full h-screen bg-black/60'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
            <div className='max-w-112.5 h-150 mx-auto bg-black/75 text-white'>
             <div className='max-w-80 mx-auto py-16'>
                <h1 className='text-2xl sm:text-3xl font-bold'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='w-full flex gap-y-3 flex-col p-4'>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className='bg-gray-600 p-3 rounded outline-none'/>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className='bg-gray-600 p-3 rounded outline-none'/>
                    <button className='block py-3 mt-3 bg-blue-500 rounded cursor-pointer'>Sign Up</button>
                    <div className='flex items-center justify-between mt-5 text-sm text-gray-500'>
                        <p><input type="checkbox" className='mr-2'/> Remember me</p>
                        <p className='cursor-pointer hover:underline'>Need help?</p>
                    </div>
                    <p className='my-8'><span className='text-gray-500'>Already subscribed to ColdPlay?</span>{'  '}<span className='cursor-pointer'><Link to='/Login'>Sign In</Link></span></p>
                </form>
             </div>
            </div>

        </div>
    </div>
  )
}

export default SignUp