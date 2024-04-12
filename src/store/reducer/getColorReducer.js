import { FETCH_DATA_REQUEST,SET_CONTENT } from "../action/action.type";

const initialState = {
  colors: [],
  creativeCreation :[]
};


const getColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        colors: action.payload
      };
      case SET_CONTENT: 
        return {
          ...state,
          
          creativeCreation: [...state.creativeCreation, action.payload]
        };
    default:
      return state;
  }
};

export default getColorReducer;
