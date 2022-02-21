// react next
import {useState, useEffect} from 'react';
import Link from 'next/link';

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store/recusers';
import { deletePostReqAction,  } from '../../store/postReducer'

//css 
import { Card, ButtonGroup, ToggleButton, Dropdown, DropdownButton } from 'react-bootstrap';

// Components
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import ImageList from './ImageList';

interface IProps {
  userId: number
  contentId: number,
  content: string,
  nickname: string,
  comments: {
    User: {
      nickname: string,
    },
    content: string ,
  }[],
  images: {
    src: string
  }[]
}

const PostContents = ({userId, contentId, content, nickname, comments, images} : IProps) => {
  const dispatch = useDispatch();
  const post = useSelector((state:RootState)=>state.postReducer);
  const user = useSelector((state:RootState)=>state.userReducer) ;
  const postLoading = useSelector((state:RootState) => state.postReducer.postLoading);

  useEffect(()=>{
  },[])

  const [ liked, setLiked ] = useState(false);
  const [ commentOpend, setCommnetOpend ] = useState(false);

  const onLikedChange = () => {
    setLiked(prev=>!prev)
  }
  const onCommentOpendChange = () => {
    setCommnetOpend(prev=>!prev)
  }
  const onDeleteContent = (contentId) =>() => {
    dispatch(deletePostReqAction(contentId));
  }

  
  return (
    <div style={{marginBottom: '10px'}}>
    <Card style={{ marginBottom: '15px' }}>

      <Card.Header as="h5">{nickname}</Card.Header>
      <Card.Body>
        {
        content.split(/(#[^\s#]+)/g).map(v=>{
          if (v.match(/(#[^\s]+)/)) {
            return (
              <Link
                href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}
                as={`/hashtag/${v.slice(1)}`}
                key={v}
              >
                <a>{v}</a>
              </Link> 
            );
          }
          return v;
        })
        }
      </Card.Body>

      <ImageList images={images}/>

      <Card.Text>
        
      </Card.Text>

      <ToggleButton
        size='sm'
        className="mb-2"
        id={`toggle-like-${contentId}`}
        type="checkbox"
        variant="outline-primary"
        checked={liked}
        value="1"
        onChange={onLikedChange}
      >
        like
      </ToggleButton>
      <ToggleButton size='sm'
        className="mb-2"
        id={`toggle-comment-opend-${contentId}`}
        type="checkbox"
        variant="outline-primary"
        checked={commentOpend}
        value="1"
        onChange={onCommentOpendChange}
      >
        Comment({comments.length})
      </ToggleButton>

      <DropdownButton id="dropdown-basic-button" title="small menu">
        {
          user ? (
            <>
              <Dropdown.Item>Update</Dropdown.Item>
              <Dropdown.Item onClick={onDeleteContent(contentId)}>delete</Dropdown.Item>
            </>
          ) : (
            <Dropdown.Item>신고</Dropdown.Item>
          )
        }
      </DropdownButton>
      
    </Card>
    
      {
        commentOpend && (
          <>
            <CommentForm contentId={contentId} />
            <CommentList comments={comments}></CommentList>
          </>
        )
      }
    </div>
  )
}

export default PostContents;