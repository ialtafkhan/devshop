import axios from "axios"
import {
    PRODUCT_REQUEST, PRODUCT_REQUEST_FAIL, PRODUCT_REQUEST_SUCCESS, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_REQUEST_FAIL, SINGLE_PRODUCT_REQUEST_SUCCESS,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_REQUEST_SUCCESS,
    ADD_PRODUCT_REQUEST_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_REQUEST_SUCCESS,
    PRODUCT_UPDATE_REQUEST_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_REQUEST_SUCCESS,
    PRODUCT_DELETE_REQUEST_FAIL,
    PRODUCT_PUBLISH_UNPUBLISH_REQUEST,
    PRODUCT_PUBLISH_UNPUBLISH_SUCCESS,
    PRODUCT_PUBLISH_UNPUBLISH_FAIL
} from "../constants/productConstants"

export const productAction = () => async dispatch => {
    try {
        dispatch({ type: PRODUCT_REQUEST })
        const { data } = await axios.get("/product")
        dispatch({
            type: PRODUCT_REQUEST_SUCCESS,
            payload: data.result
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_REQUEST_FAIL,
            payload: error
        })

    }
}
export const singleProductAction = id => async dispatch => {
    try {
        dispatch({ type: SINGLE_PRODUCT_REQUEST })
        const { data } = await axios.get(`/product/${id}`)
        dispatch({
            type: SINGLE_PRODUCT_REQUEST_SUCCESS,
            payload: data.result
        })
    } catch (error) {
        dispatch({
            type: SINGLE_PRODUCT_REQUEST_FAIL,
            payload: error
        })

    }
}
export const addProductAction = fd => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST })
        // console.log(fd._boundary);
        // for (const pair of fd.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": getState().user.login.token
            }
        }
        const { data } = await axios.post(`/product`, fd, config)
        dispatch({
            type: ADD_PRODUCT_REQUEST_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_REQUEST_FAIL,
            payload: error
        })

    }
}
export const updateProductAction = (fd, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": getState().user.login.token
            }
        }
        const { data } = await axios.put(`/product/${id}`, fd, config)
        dispatch({
            type: PRODUCT_UPDATE_REQUEST_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST_FAIL,
            payload: error
        })

    }
}
export const deleteProductAction = id => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        const config = {
            headers: {
                "Authorization": getState().user.login.token
            }
        }
        const { data } = await axios.delete(`/product/${id}`, config)
        dispatch({
            type: PRODUCT_DELETE_REQUEST_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_REQUEST_FAIL,
            payload: error
        })

    }
}
export const handlePublishEditAction = (id, val) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_PUBLISH_UNPUBLISH_REQUEST })

        const config = {
            headers: {
                "Authorization": getState().user.login.token
            }
        }
        const { data } = await axios.put(`/product/publish/${id}`, { publish: val }, config)
        dispatch({
            type: PRODUCT_PUBLISH_UNPUBLISH_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_PUBLISH_UNPUBLISH_FAIL,
            payload: error
        })

    }
}



