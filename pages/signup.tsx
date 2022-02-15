import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import CommonContainer from '../components/CommonContainer';

// components
import NewAccountForm from '../components/signUp/NewAccountForm';

const Signup = () => {
  return (
    <>
    <Head>
      <title>
        Signup page
      </title>
    </Head>
    <CommonContainer >
      <p>Signup</p>

      <NewAccountForm />
      
    </CommonContainer>
    </>
  )
}

export default Signup;
