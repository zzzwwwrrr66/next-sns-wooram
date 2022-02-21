
import produce from "immer";
import shortId from 'shortid';

export const initialState = {
  mainPosts: [
    {
    id: 'asd',
    User: {
      id: 1,
      nickname: 'wooram',
    },
    content: '첫 번째 게시글 #asdb #wooram',
    Images: [{
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }, {
      src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    }, 
    {
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    },
    {
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    },
    {
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    }
  ],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔군요~',
    }, {
      User: {
        nickname: 'hero',
      },
      content: '얼른 사고싶어요~',
    }]
  }
],
  imagePaths: [],
  postAdded: false,
  postLoading: false,
  deleteLoading: false,
  commentLoading: false,
  fakerAddPostLoading: false,
  hasMorePost: true,
};

export const generateDummyPost = (number: number) => Array(number).fill(null).map(() => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: `dummy name id:${shortId.generate()}`,
  },
  content: 'dummy content',
  Images: [],
  Comments: [{
    User: {
      id: shortId.generate(),
      nickname: 'dummy name2',
    },
    content: 'dummy contents',
  }],
}));

const ADD_POST = 'ADD_POST';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAIL = 'ADD_COMMENT_FAIL';

export const LOAD_FAKER_ADD_POST_REQUEST = 'LOAD_FAKER_ADD_POST_REQUEST';
export const LOAD_FAKER_ADD_POST_SUCCESS = 'LOAD_FAKER_ADD_POST_SUCCESS';
export const LOAD_FAKER_ADD_POST_FAIL = 'LOAD_FAKER_ADD_POST_FAIL';

export const addPostAction = {
  type: ADD_POST,
};
export const addPostReqAction = (payload) => {
  return {
    type: ADD_POST_REQUEST,
    payload,
  }
}
export const addCommentReqAction = (payload) => {
  return {
    type: ADD_COMMENT_REQUEST,
    payload,
  }
}
export const deletePostReqAction = (payload) => {
  return {
    type: DELETE_POST_REQUEST,
    payload,
  }
}
export const loadFakerAddPostReqAction = {
  type: LOAD_FAKER_ADD_POST_REQUEST,
}

interface IDummyPost {
  id: string;
  User: {
    id: string;
    nickname: string;
  };
  content: any;
  Images: any[];
  Comments: any[];
}
const addDummyPost = (userId: any, userName: string, contentInfo: string ) => {
  return {
    User: {
      id: userId,
      nickname: userName,
    },
    content: contentInfo,
    Images: [],
    Comments: [],
  }
} 


const postReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.postLoading = true;
      break;
    case ADD_POST_SUCCESS:
      draft.postLoading = false;
      const test = addDummyPost(action.payload.userId, action.payload.userName, action.payload.postTxt)
      const addData = {
        id: action.payload.conetentId,
        ...test
      }
      draft.mainPosts.unshift(addData);
      break;
    case ADD_POST_FAIL:
      console.log('REDUCER ADD_POST_FAIL');
      draft.postLoading = false;
      break;
    //ADD_POST E

    case DELETE_POST_REQUEST:
      draft.deleteLoading = true;
      break;
    case DELETE_POST_SUCCESS:
      draft.deleteLoading = false;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.payload);
      break;
    case DELETE_POST_FAIL:
      draft.deleteLoading = false;
      break;
    // DELETE_POST E

    // ADD_COMMENT_REQUEST
    case ADD_COMMENT_REQUEST:
      draft.commentLoading = true;
      break;
    case ADD_COMMENT_SUCCESS:
      // draft.mainPosts.map((v)=> {
      //   if(v.id === action.payload.id) {
      //     v.Comments.unshift(action.payload.data);
      //   }
      // })
      const currentPost = draft.mainPosts.find((v)=> v.id === action.payload.id);
      currentPost.Comments.unshift(action.payload.data);
      draft.commentLoading = false;
    break;
    case ADD_COMMENT_FAIL:
      console.log('REDUCER ADD_COMMENT_FAIL');
      draft.commentLoading = false;
    break;

    case LOAD_FAKER_ADD_POST_REQUEST:
      console.log('REDUCER LOAD_FAKER_ADD_POST_REQUEST');
      draft.fakerAddPostLoading = true;
    break;
    case LOAD_FAKER_ADD_POST_SUCCESS:
      draft.fakerAddPostLoading = false;
      console.log('REDUCER LOAD_FAKER_ADD_POST_SUCCESS', action.payload);
      draft.mainPosts = draft.mainPosts.concat(action.payload);
      draft.hasMorePost = draft.mainPosts.length < 50;

    break;
    case LOAD_FAKER_ADD_POST_FAIL:
      console.log('REDUCER LOAD_FAKER_ADD_POST_FAIL');
      draft.fakerAddPostLoading = false;
    break;

    default:
      break;
  }
});

export default postReducer;