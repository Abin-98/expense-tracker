import { useContext, useEffect } from "react"
import PostLogin from "./Pages/PostLogin"
import Signup from "./Pages/Signup"
import { ContextFile } from "./context/ContextFile"

function App() {
  const {idToken, setIdToken} = useContext(ContextFile)
  useEffect(()=>{
    let id=localStorage.getItem('idtoken')
    if(id){
      setIdToken(id)
    }
  },[])
  return (
      <div>
        {idToken ? <PostLogin/> : <Signup/>}
      </div>
  )
}

export default App
