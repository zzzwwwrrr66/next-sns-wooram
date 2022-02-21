// next
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

// layout 
import CommonContainer from '../components/CommonContainer';

//components 
import FollowList from '../components/profile/FollowList';
import FollowingList from '../components/profile/FollowingList';
import NameUpdate from '../components/profile/NameUpdateForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// redux
import { RootState } from '../store/recusers';


const Profile = () => {
  const router = useRouter();
  const user = useSelector((state: RootState)=> state.userReducer.user)
  const followListData = [{name: 'wooram'}, {name: 'misa'}]
  const followingListData = [{name: 'zerocho'}, {name: 'hoho'}]

  useEffect(()=>{
    if(!user) {
      router.push('/');
    }
  }, [user]);

  return (
    <>
    <Head>
      <title>
        Profile page
      </title>
    </Head>
    <CommonContainer >
      <p>Profile</p>


      <NameUpdate />
      <FollowList data={followListData}></FollowList>
      <FollowingList data={followingListData}></FollowingList>
    </CommonContainer>
    </>
  )
}

export default Profile;
