import type { NextPage } from 'next';

import CommonContainer from '../components/CommonContainer';
import Head from 'next/head';

//redux 
import { useSelector } from "react-redux";
import {RootState} from '../store/recusers'

// components 
import PostForm from '../components/post/PostForm';
import PostList from '../components/post/PostList';

const Home: NextPage = () => {
  const user = useSelector((state:RootState)=>state.userReducer);
  const post = useSelector((state:RootState)=>state.postReducer);
  
  return (
    <>
    <Head>
      <title>HOME</title>
    </Head>
    <CommonContainer >
      {
        user?.isLogin && (<PostForm/>)
      }
      {
        post.mainPosts.map(v=> {
          return(
            <PostList 
              id={v.id} 
              content={v.content} 
              userId={v.User.id} 
              nickname={v.User.nickname}
              comments={v.Comments}
              images={v.Images}
            />
          )
        })
      }
      
    </CommonContainer>
    </> 
  )
}

export default Home
