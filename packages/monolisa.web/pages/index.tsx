import { DealWithIt, Button } from '../components'
import { useThemeContext } from '../hooks'

const Index = () => {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <>
      <DealWithIt text="🖼️ Hello world" />
      <Button onClick={toggleTheme}>{theme}</Button>
    </>
  )
}

export default Index
