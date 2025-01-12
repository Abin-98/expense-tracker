import { useContext, useEffect } from "react"
import Welcome from "./Pages/Welcome"
import Signup from "./Pages/Signup"
import { ContextFile } from "./context/ContextFile"
import { Navigate, Route, Routes } from "react-router-dom"
import Contact from "./Pages/Contact"

function App() {
  const {isLoggedIn, setIdToken} = useContext(ContextFile)

  useEffect(()=>{
    let id=localStorage.getItem('idtoken')
    // eslint-disable-next-line no-extra-boolean-cast
    if(!!id){
      setIdToken(id)
    }
  },[])
  
  return (
      <Routes>
        <Route path="/" element={isLoggedIn?<Welcome/>:<Navigate to={'/login'} replace/>}/>
        <Route path="/login" element={<Signup/>}/>
        <Route path="/contact" element={isLoggedIn?<Contact/>:<Navigate to={'/login'} replace/>}/>
        <Route path="*" element={isLoggedIn?<Navigate to={'/'} replace/>:<Signup/>}/>
      </Routes>
  )
}

export default App
