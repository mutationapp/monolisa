import { Spinner, Box } from '..'

const Loading: React.FunctionComponent<{ box: boolean }> = ({ box }) => {
  return box ? (
    <Box>
      <Spinner />
    </Box>
  ) : (
    <Spinner />
  )
}

export default Loading
