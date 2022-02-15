import {FC} from 'react';
//css 
import { Nav, Col, Row, Container, Card, Button, Stack } from 'react-bootstrap';

interface IProps {
  data: {
    name: string
  }[],
}
const FollowList:FC<IProps> = ({data}) => {
  return(
    <div className='mb-3'>
      <h3>Follow list</h3>
      <Stack gap={2}>
        {
          data?.map((v, i)=>{
            return((
              <Card key={i}>
                <Card.Header>
                  {v.name}
                </Card.Header>
                <Card.Body>
                  <Button variant="outline-secondary">
                    Delete
                  </Button>
                </Card.Body>
              </Card> 
            ))
          })
        }
      </Stack>

      <div className='mt-4 d-flex justify-content-center '>
        <Button variant="outline-secondary">More</Button>
      </div>
    </div>
  )
}

export default FollowList;