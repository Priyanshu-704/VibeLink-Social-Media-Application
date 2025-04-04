import { PROFILE_TYPES } from "../actions/profileActions"; // Assuming this is where the PROFILE_TYPES are coming from

const initialState = {
  users: [],
  loading: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case PROFILE_TYPES.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload], 
      };

    default:
      return state;
  }
};

export default profileReducer;
