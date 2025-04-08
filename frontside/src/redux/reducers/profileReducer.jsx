import { PROFILE_TYPES } from "../actions/profileActions"; // Assuming this is where the PROFILE_TYPES are coming from
import {EditData} from "../actions/alertActions"

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

      case PROFILE_TYPES.FRIEND:
        return{
            ...state,
            users: EditData(state.users, action.payload._id, action.payload)        
        
        }
        case PROFILE_TYPES.UNFRIEND:
        return{
            ...state,
            users: EditData(state.users, action.payload._id, action.payload)
                
        
        }
    default:
      return state;
  }
};

export default profileReducer;
