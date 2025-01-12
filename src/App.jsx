import { useContext } from "react"
import Welcome from "./Pages/Welcome"
import Signup from "./Pages/Signup"
import { ContextFile } from "./context/ContextFile"
import { Navigate, Route, Routes } from "react-router-dom"
import Contact from "./Pages/Contact"
import ForgotPassword from "./Pages/ForgotPassword"

function App() {
  const {isLoggedIn} = useContext(ContextFile)
  
  return (
      <Routes>
        <Route path="/" element={isLoggedIn?<Welcome/>:<Navigate to={'/login'} replace/>}/>
        <Route path="/login" element={<Signup/>}/>
        <Route path="/contact" element={isLoggedIn?<Contact/>:<Navigate to={'/login'} replace/>}/>
        <Route path="*" element={isLoggedIn?<Navigate to={'/'} replace/>:<Signup/>}/>
        <Route path="/forgotpass" element={<ForgotPassword/>}/>

      </Routes>
  )
}

export default App
