import * as types from 'constants/actionTypes';

export function changeName () {
  console.log('d')
  return {
    type: types.CHANGE_NAME
  };
}