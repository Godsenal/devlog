const initialState = {
  login: {
    username: '',
    nickname: '',
    isValid: false,
  },
  signup: {
    username: '',
    nickname: '',
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
