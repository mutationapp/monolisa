import { useContext } from 'react'
import { ThemeContext } from '../../contexts'

const useThemeContext = () => {
  return useContext(ThemeContext)
}

export default useThemeContext
