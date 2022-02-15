//react 
import {useCallback, useState} from 'react'
//css 
import { Form, Button } from 'react-bootstrap';

// custom Hooks
import useInput from '../../Hooks/useInput';

//redux
import { useDispatch } from 'react-redux';
import { addPostAction } from '../../store/postReducer';

const PostForm = () => {
  const dispatch = useDispatch();

  const [postTxt, setPostTxt] = useState('');
  const [img, setImg] = useState('');
  
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
    dispatch(addPostAction);
    setPostTxt('');
    setImg('');
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
          <Button onClick={onAddPost}>POST</Button>
        </div>
      </Form>
    </>   
  )
}

export default PostForm;