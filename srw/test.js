import useSWR, { Key, Fetcher } from 'swr';

const fetcher = () => {
  return new Promise(resolve => {
		setTimeout(() => {
      const obj = { 
        test: 'test'
      }
			resolve(obj);
		}, 1000)
	})	
}

export function useTestSwr () {
  const { data, error } = useSWR(`/api/user/`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}