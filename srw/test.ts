import useSWR from 'swr'

const fetcher = () => {
  return {
    data: 'test',
  }
}
function Test () {
  const { data, error } = useSWR(`/api/user/`, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}