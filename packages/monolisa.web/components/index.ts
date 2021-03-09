import DealWithIt from './dealWithIt'
import Button from './button'
import Spinner from './spinner'
import Header from './header'
import Frame from './frame'
import Text from './text'
import Img from './img'
import U from './u'
import Grid from './grid'

export const render = (f: { (): React.ReactNode | null }) => f()

export { Button, DealWithIt, Frame, Grid, Header, Img, Spinner, Text, U }
