import * as types from '../constants/actionTypes';

const initialState = {
  name: 'Alex'
};

export default function aboutMe(state = initialState, action = {}) {
  switch (action.type) {
    // case types.LOGIN:
    //   return {
    //     ...state,
    //     isLogged: 'YES'
    //   };

    default:
      return state;
  }
}
