import { combineReducers } from 'redux'

const contactPage = (state = {page: 0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { page: state.page + 1 }
    case 'BACK_TO_START':
      return { page: 0 }
    default:
      return state
  }
}

export default contactPage
