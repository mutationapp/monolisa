import DealWithIt from './dealWithIt'
import Button from './button'
import Spinner from './spinner'
import Header from './header'
import Frame from './frame'
import Text from './text'

export const render = (f: { (): React.ReactNode | null }) => f()

export { Text, Frame, Header, Button, DealWithIt, Spinner }
