import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import CommonContainer from '../components/CommonContainer';

//components 
import FollowList from '../components/Profile/FollowList';
import FollowingList from '../components/Profile/FollowingList';
import NameUpdate from '../components/Profile/NameUpdate';


const Profile = () => {
  const followListData = [{name: 'wooram'}, {name: 'misa'}]
  const followingListData = [{name: 'zerocho'}, {name: 'hoho'}]
  return (
    <>
    <Head>
      <title>
        Profile page
      </title>
    </Head>
    <CommonContainer >
      <p>Profile</p>


      <NameUpdate/>
      <FollowList data={followListData}></FollowList>
      <FollowingList data={followingListData}></FollowingList>
    </CommonContainer>
    </>
  )
}

export default Profile;
