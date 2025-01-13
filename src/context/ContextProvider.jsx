import { useState } from 'react'
import { ContextFile } from './ContextFile'
import { useNavigate } from 'react-router-dom'


const ContextProvider = (props) => {
  const navigate=useNavigate()
  const [idToken, setIdToken] = useState(localStorage.getItem('idtoken'))
  const [emailVerified, setEmailVerified]=useState(false)
  const isLoggedIn = !!idToken
  const [expenseList, setExpenseList] =useState({})

  const value={
      idToken,
      setIdToken,
      navigate,
      isLoggedIn,
      emailVerified,
      setEmailVerified,
      expenseList,
      setExpenseList
    }
  return (
    // eslint-disable-next-line react/prop-types
    <ContextFile.Provider value={value}>{props.children}</ContextFile.Provider>
  )
}

export default ContextProvider