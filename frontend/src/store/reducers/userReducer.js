import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAIL,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_REQUEST_SUCCESS,
  GET_ALL_USER_REQUEST_FAIL,
  USER_ADMIN_REQUEST,
  USER_ADMIN_REQUEST_SUCCESS,
  USER_ADMIN_REQUEST_FAIL,
  USER_ACTIVE_REQUEST,
  USER_ACTIVE_REQUEST_SUCCESS,
  USER_ACTIVE_REQUEST_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_REQUEST_SUCCESS,
  FORGET_PASSWORD_REQUEST_FAIL
} from "./../constants/userConstants";
export const userReducer = (
  state = { users: [], login: {} },
  { type, payload }
) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        isLoading: false,
        login: payload,
      };
    case LOGIN_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case SIGNUP_REQUEST:
      return {
        isLoading: true,
      };
    case SIGNUP_REQUEST_SUCCESS:
      return {
        isLoading: false,
        signup: true,
      };
    case SIGNUP_REQUEST_FAIL:
      return {
        isLoading: false,
        error: payload,
      };

    case LOGOUT:
      return {};

    case GET_ALL_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_USER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
        isAdmin: true,
      };
    case GET_ALL_USER_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case USER_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_ADMIN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    case USER_ADMIN_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case USER_ACTIVE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_ACTIVE_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    case USER_ACTIVE_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

      // forget Password

      case FORGET_PASSWORD_REQUEST: 
      return {
        isLoading: true,
      }
      case FORGET_PASSWORD_REQUEST_SUCCESS:
      return {
        isLoading: false,
        emailSend : true
      }
      case FORGET_PASSWORD_REQUEST_FAIL: 
      return {
        isLoading: false,
        emailSend : false,
        error: payload,
      }

    default:
      return state;
  }
};
