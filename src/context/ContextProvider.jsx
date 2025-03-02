import { useState } from 'react'
import { ContextFile } from './ContextFile'
import { useNavigate } from 'react-router-dom'

const ContextProvider = (props) => {
  const navigate=useNavigate()
  const [emailVerified, setEmailVerified]=useState(false)

  const value={
      navigate,
      emailVerified,
      setEmailVerified,
    }
  return (
    // eslint-disable-next-line react/prop-types
    <ContextFile.Provider value={value}>{props.children}</ContextFile.Provider>
  )
}

export default ContextProvider