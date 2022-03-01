const contacts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return [
        ...state,
        {
          id: action.data.id,
          name: action.data.name,
          phone: action.data.phone,
          mobile: action.data.mobile,
          address: action.data.address,
          city: action.data.city,
          state: action.data.state,
          district: action.data.district,
          initials: action.data.initials,
          indexLetter: {
            status: action.data.letterIndex.status,
            letter: action.data.letterIndex.letter
          }
        }
      ]
    case 'REMOVE_CONTACTS':
      return state = []
    default:
      return state
  }
}

export default contacts
