import { useState } from 'react'
import { ContextFile } from './ContextFile'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const ContextProvider = (props) => {
  const navigate=useNavigate()
  // const [idToken, setIdToken] = useState(localStorage.getItem('idtoken'))
  const idToken = useSelector(state=>state.auth.idToken)
  const [emailVerified, setEmailVerified]=useState(false)
  const isLoggedIn = !!idToken
  const [expenseList, setExpenseList] =useState({})

  const value={
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