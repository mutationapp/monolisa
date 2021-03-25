import { useContext } from 'react'
import { AppContext } from '../../contexts'

const useAppContext = () => {
  return useContext(AppContext)
}

export default useAppContext
