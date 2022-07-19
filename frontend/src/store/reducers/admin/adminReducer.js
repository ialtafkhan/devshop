import {
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_REQUEST_SUCCESS,
    ADMIN_PRODUCT_REQUEST_FAIL
} from "../../constants/adminContstants"
import { PRODUCT_PUBLISH_UNPUBLISH_FAIL, PRODUCT_PUBLISH_UNPUBLISH_REQUEST, PRODUCT_PUBLISH_UNPUBLISH_SUCCESS } from "../../constants/productConstants"

export const adminReducer = (state = {
    products: []
}, { type, payload }) => {

    switch (type) {
        case ADMIN_PRODUCT_REQUEST: return {
            ...state,
            isLoading: true
        }
        case ADMIN_PRODUCT_REQUEST_SUCCESS: return {
            ...state,
            isLoading: false,
            products: payload
        }
        case ADMIN_PRODUCT_REQUEST_FAIL: return {
            ...state,
            isLoading: false,
            error: payload
        }
        case PRODUCT_PUBLISH_UNPUBLISH_REQUEST: return {
            ...state,
            isLoading: true
        }
        case PRODUCT_PUBLISH_UNPUBLISH_SUCCESS: return {
            ...state,
            isLoading: false,
            publishEdit: true
        }
        case PRODUCT_PUBLISH_UNPUBLISH_FAIL: return {
            ...state,
            isLoading: false,
            publishEdit: false,
            error: payload
        }
        default: return state
    }
}