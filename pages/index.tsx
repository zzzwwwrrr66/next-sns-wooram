import type { NextPage } from 'next';

import CommonContainer from '../components/CommonContainer';
import Head from 'next/head';

//redux 
import { useDispatch, useSelector } from "react-redux";
import {RootState} from '../store/recusers'
import { loadFakerAddPostReqAction } from '../store/postReducer'

// components 
import PostForm from '../components/post/PostForm';
import PostList from '../components/post/PostList';

// swr test
import { useTestSwr } from '../srw/test.js';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  // const { data, isLoading } = useTestSwr()
  const user = useSelector((state:RootState)=>state.userReducer);
  const post = useSelector((state:RootState)=>state.postReducer);

  useEffect(()=>{
    dispatch(loadFakerAddPostReqAction);
  },[])


  // on scroll faker add post request S
  useEffect(()=>{
    function test() {
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if(post.hasMorePost && !post.fakerAddPostLoading ) {
          dispatch(loadFakerAddPostReqAction);
        }
      }
    }
    window.addEventListener('scroll', test);
  }, [post.hasMorePost]);
  // on scroll faker add post request E
  
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
              contentId={v.id} 
              content={v.content} 
              userId={v.User.id} 
              nickname={v.User.nickname}
              comments={v.Comments}
              images={v.Images}
              key={v.id}
            />
          )
        })
      }
      
    </CommonContainer>
    </> 
  )
}

export default Home
