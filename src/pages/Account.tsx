import SavedShows from "../components/SavedShows"

const Account = () => {
  return (
    <>
    <div className='w-full text-white'>
      <img className='w-full h-100 object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/435e8bb8-7f1b-49cb-8da8-bff997124294/web/NG-en-20260511-TRIFECTA-perspective_1fe8a025-7c55-4a17-9574-0bf28be6b40b_large.jpg' alt='/'></img>
      <div className='bg-black/60 fixed top-0 left-0 w-full h-137.5'></div>
      <div className='absolute top-1/5 p-4 md:p-8'>
        <h1 className='text-3xl md:text-5xl font-bold'>My Movies</h1>
      </div>
    </div>
    <SavedShows/>
    </>
  )
}

export default Account