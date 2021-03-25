import { useBlobType } from '.'
import { blobType } from 'monolisa.model'
import { useSWR } from '..'

const useBlob: useBlobType = ({ fetcher }) => ({
  provider,
  owner,
  repo,
  mergeCommitSha,
  path,
}) => {
  const response = useSWR<blobType>(
    `/api/repositories/${provider}/${owner}/${repo}/${mergeCommitSha}/blob/${path}`,
    fetcher,
  )

  const { data, error } = response

  return {
    data,
    error,
  }
}

export default useBlob
