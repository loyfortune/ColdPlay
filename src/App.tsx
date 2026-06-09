import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { AuthContextProvider } from "./context/AuthContext"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Account from "./pages/Account"
import ProtectedRoute from "./components/ProtectedRoute"
import MoviePage from "./pages/MoviePage"
import Watch from "./pages/Watch"


function App() {

  return (
    <>
    <AuthContextProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/movie/:id' element={<MoviePage />}/>
        <Route path='/watch/:id' element={<ProtectedRoute><Watch/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>}/>
      </Routes>
    </AuthContextProvider>
    </>
  )
}

export default App
