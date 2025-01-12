import { useState } from 'react'
import { ContextFile } from './ContextFile'
import { useNavigate } from 'react-router-dom'


const ContextProvider = (props) => {
  const navigate=useNavigate()
  const [idToken, setIdToken] = useState('')
  const isLoggedIn = !!idToken

  const value={
      idToken,
      setIdToken,
      navigate,
      isLoggedIn
    }
  return (
    // eslint-disable-next-line react/prop-types
    <ContextFile.Provider value={value}>{props.children}</ContextFile.Provider>
  )
}

export default ContextProvider