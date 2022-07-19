import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
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
  FORGET_PASSWORD_REQUEST_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const loginAction =
  ({ email, password }) =>
    async (dispatch) => {
      try {
        dispatch({ type: LOGIN_REQUEST });
        const { data } = await axios.post("/auth/login", { email, password });
        if (data.result.token) {
          dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: data.result });
          localStorage.setItem("login", JSON.stringify(data.result));
        } else {
          dispatch({
            type: LOGIN_REQUEST_FAIL,
            payload: "Username or password Wrong",
          });
        }
      } catch (error) {
        dispatch({ type: LOGIN_REQUEST_FAIL, payload: error });
      }
    };
export const logoutAction = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("login");
};

export const signupAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });
    await axios.post("/user", data);
    dispatch({ type: SIGNUP_REQUEST_SUCCESS });
    dispatch(loginAction({ email: data.email, password: data.password }));
  } catch (error) {
    dispatch({ type: SIGNUP_REQUEST_FAIL, payload: error });
  }
};

export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_REQUEST });

    const { data } = await axios.get(`/user`);
    dispatch({
      type: GET_ALL_USER_REQUEST_SUCCESS,
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_REQUEST_FAIL,
      payload: error,
    });
  }
};

export const usersAdminAction = (id, val) => async (dispatch) => {
  try {
    dispatch({ type: USER_ADMIN_REQUEST });

    const { data } = await axios.put(`/user/isadmin/${id}`, { isAdmin: val });

    dispatch({ type: USER_ADMIN_REQUEST_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_ADMIN_REQUEST_FAIL,
      payload: error,
    });
  }
};

export const usersActiveAction = (id, val) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ACTIVE_REQUEST });

    const config = {
      headers: {
        Authorization: getState().user.login.token,
      },
    };

    const { data } = await axios.put(
      `/user/deactivate/${id}`,
      { isActive: val },
      config
    );

    dispatch({ type: USER_ACTIVE_REQUEST_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_ACTIVE_REQUEST_FAIL,
      payload: error,
    });
  }
};

export const forgetPasswordAction = (email) => async (dispatch) => {
  try {
    console.log(email);
    dispatch({ type: FORGET_PASSWORD_REQUEST });

    const { data } = await axios.post(`/auth/forgetpassword`, email);

    dispatch({ type: FORGET_PASSWORD_REQUEST_SUCCESS });
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_REQUEST_FAIL,
      payload: error,
    });
  }
};
