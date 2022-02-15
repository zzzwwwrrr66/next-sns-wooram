import { useRouter } from "next/dist/client/router";
import Link from "next/Link";
import React, {ReactElement, FC, ReactNode,useState,useEffect} from "react";

//css 
import { Nav, Col, Row, Container } from 'react-bootstrap';

// components
import LoginForm from './LoginForm';
import MyProfile from './MyProfile';

//store
import { useSelector } from "react-redux";
import type { RootState } from '../store/recusers';

interface IProps {
  children : ReactNode
}

const CommonContainer:FC<IProps> = ({children}) => {

  const state = useSelector((state:RootState)=> state.userReducer);

  return(
    <>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link as='div'>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as='div'>
            <Link href='/signup'>
              <a>signup</a>
            </Link>
          </Nav.Link>
        </Nav.Item>
        {
          state?.isLogin ? (
            <Nav.Item>
              <Nav.Link as='div'>
                <Link href='/profile'>
                  <a>profile</a>
                </Link>
              </Nav.Link>
            </Nav.Item>
          ) : (
            null
          )
        }
        
      </Nav>
      <Container>
        <Row>
          <Col xs={12} md={5}>
            {
              state?.isLogin ? (
                <MyProfile/>
              ) : (
                <LoginForm/>
              )
            }

          </Col>
          <Col xs={12} md={7}>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default CommonContainer;

