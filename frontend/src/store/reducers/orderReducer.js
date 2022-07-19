import {
  ORDER_REQUEST,
  ORDER_REQUEST_SUCCESS,
  ORDER_REQUEST_FAIL,
  ORDER_REMOVE_PLACEDORDER,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_REQUEST_SUCCESS,
  ORDER_HISTORY_REQUEST_FAIL,
  UPDATE_STATUS_ORDER_REQUEST,
  UPDATE_STATUS_ORDER_REQUEST_SUCCESS,
  UPDATE_STATUS_ORDER_REQUEST_FAIL,
  GET_MY_OREDER_REQUEST,
  GET_MY_OREDER_REQUEST_SUCCESS,
  GET_MY_OREDER_REQUEST_FAIL,
} from "./../constants/orderConstants";
export const orderReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        placedOrder: payload,
      };
    case ORDER_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case ORDER_REMOVE_PLACEDORDER:
      return {};

    case ORDER_HISTORY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ORDER_HISTORY_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload,
      };
    case ORDER_HISTORY_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case UPDATE_STATUS_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_STATUS_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: true,
      };
    case UPDATE_STATUS_ORDER_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };


    case GET_MY_OREDER_REQUEST: return { ...state, isLoading: true }
    case GET_MY_OREDER_REQUEST_SUCCESS: return { ...state, isLoading: false, orders: payload }
    case GET_MY_OREDER_REQUEST_FAIL: return { ...state, isLoading: false, error: payload }


    default:
      return state;
  }
};
