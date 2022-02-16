// next react
import { useRouter } from 'next/router'
const HashTag = () => {
  const router = useRouter()
  
  if(router.isReady) {
    console.log(router);
  }
  
  return(
    <>
    hashtag
    </>
  )
}
export default HashTag