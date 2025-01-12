import { useState } from 'react'
import { ContextFile } from './ContextFile'


const ContextProvider = (props) => {
  const [idToken, setIdToken] = useState('')
  const value={
      idToken,
      setIdToken

    }
  return (
    // eslint-disable-next-line react/prop-types
    <ContextFile.Provider value={value}>{props.children}</ContextFile.Provider>
  )
}

export default ContextProvider