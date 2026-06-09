import { useState } from "react";
import { Link, useNavigate } from "react-router"
import { UserAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {signIn} = UserAuth();
    const navigate = useNavigate();
    
      const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) =>{
            e.preventDefault();
            try{
            await signIn(email, password);
            navigate('/');
            } catch (error) {
                console.log(error);
                setError((error as Error).message.includes('auth/invalid-credential') ? 'Invalid email or password.' : 'An error occurred. Please try again.');
            }
        }

  return (
    <div className='w-full h-screen'>
        <img className='absolute w-full h-full object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/435e8bb8-7f1b-49cb-8da8-bff997124294/web/NG-en-20260511-TRIFECTA-perspective_1fe8a025-7c55-4a17-9574-0bf28be6b40b_large.jpg' alt='/'></img>
        <div className='fixed top-0 left-0 w-full h-screen bg-black/60'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
            <div className='max-w-112.5 h-150 mx-auto bg-black/75 text-white'>
             <div className='max-w-80 mx-auto py-16'>
                <h1 className='text-2xl sm:text-3xl font-bold'>Sign In</h1>
                {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
                <form onSubmit={handleSubmit} className='w-full flex gap-y-3 flex-col py-4'>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className='bg-gray-600 p-3 rounded outline-none'/>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className='bg-gray-600 p-3 rounded outline-none'/>
                    <button className='block py-3 mt-3 bg-blue-500 rounded cursor-pointer'>Sign In</button>
                    <div className='flex items-center justify-between mt-5 text-sm text-gray-500'>
                        <p><input type="checkbox" className='mr-2'/> Remember me</p>
                        <p className='cursor-pointer hover:underline'>Forgot password?</p>
                    </div>
                    <p className='my-8'><span className='text-gray-500'>Don't have an account?</span>{'  '}<span className='cursor-pointer'><Link to='/signup'>Sign Up</Link></span></p>                    
                </form>
             </div>
            </div>

        </div>
    </div>
  )
}

export default Login