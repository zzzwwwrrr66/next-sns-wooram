//react 
import {useCallback, useState, useEffect} from 'react'
//css 
import { Form, Button } from 'react-bootstrap';

// custom Hooks
import useInput from '../../hooks/useInput';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { addPostAction, addPostReqAction } from '../../store/postReducer';
import {RootState} from '../../store/recusers'

const PostForm = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state:RootState) => state.userReducer.user) || null;
  const postLoading = useSelector((state:RootState) => state.postReducer.postLoading);
  
  const [postTxt, setPostTxt] = useState('');
  const [img, setImg] = useState('');

  useEffect(()=>{
    if(postLoading) {
      setPostTxt('');
      setImg('');
    }
  }, [postLoading]);
  
  const onImgChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.value);
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    // for (const keyValue of formData) setImg(keyValue)
  }, []);

  const onChangePostTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTxt(e.target.value)
  }

  const onAddPost = () => {
    if(userInfo) {
      console.log(postTxt, userInfo.userId);
      const payload = {
        userId : userInfo.userId,
        userName : userInfo.name,
        postTxt
      }
      dispatch(addPostReqAction(payload));
    };
  }
  
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Contents</Form.Label>
          <Form.Control as="textarea" rows={4} value={postTxt} onChange={onChangePostTxt}/>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>File</Form.Label>
          <Form.Control type="file" onChange={onImgChange}/>  
        </Form.Group>
        <div className='d-flex justify-content-end'>
          <Button onClick={onAddPost} disabled={postLoading}>
            {
              postLoading ? 'loading...' : 'POST'
            }
          </Button>
        </div>
      </Form>
    </>   
  )
}

export default PostForm;