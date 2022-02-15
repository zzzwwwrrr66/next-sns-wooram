import {useState} from 'react';
//redux
import { useSelector } from "react-redux";
import { RootState } from '../../store/recusers';

//css 
import { Card, ButtonGroup, ToggleButton, Dropdown, DropdownButton } from 'react-bootstrap';

interface IProps {
  userId: number
  id: number,
  content: string,
  nickname: string,
  comments: {
    User: {
      nickname: string,
    },
    content: string,
  }[]
}

const PostContents = ({userId, id, content, nickname, comments} : IProps) => {
  const post = useSelector((state:RootState)=>state.postReducer);
  const user = useSelector((state:RootState)=>state.userReducer);

  const [ liked, setLiked ] = useState(false);
  const [ commentOpend, setCommnetOpend ] = useState(false);
  console.log('postContents', post, user);

  const onLikedChange = () => {
    setLiked(prev=>!prev)
  }
  const onCommentOpendChange = () => {
    setCommnetOpend(prev=>!prev)
  }

  
  return (
    <Card key={id} style={{ marginBottom: '15px' }}>
      <Card.Header as="h5">{nickname}</Card.Header>
      <Card.Text>{content}</Card.Text>
      <ToggleButton
        size='sm'
        className="mb-2"
        id={`toggle-like-${id}`}
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
        id={`toggle-comment-opend-${id}`}
        type="checkbox"
        variant="outline-primary"
        checked={commentOpend}
        value="1"
        onChange={onCommentOpendChange}
      >
        Comment
      </ToggleButton>

      <DropdownButton id="dropdown-basic-button" title="small menu">
        {
          user?.user?.userId == userId ? (
            <>
              <Dropdown.Item>Update</Dropdown.Item>
              <Dropdown.Item>delete</Dropdown.Item>
            </>
          ) : (
            <Dropdown.Item>신고</Dropdown.Item>
          )
        }
      </DropdownButton>
      
      {
        commentOpend && <div>comments opend</div> 
      }
    </Card>
  )
}

export default PostContents;