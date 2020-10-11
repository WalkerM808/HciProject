import {SET_ERRORS, CLEAR_ERRORS} from '../tyeps';
import { LOADING_UI } from '../types';

const initialState = {
    errors: null
  };


export default function(state = initialState, action) {
    switch (action.type) {
      case SET_ERRORS:
        return {
          ...state,
          errors: action.payload
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          errors: null
        };
      case LOADING_UI:
        return {
          ...state,
        }
      default:
        return state;
    }
  }