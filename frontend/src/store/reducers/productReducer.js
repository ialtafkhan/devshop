import {
    PRODUCT_REQUEST,
    PRODUCT_REQUEST_FAIL,
    PRODUCT_REQUEST_SUCCESS,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_REQUEST_FAIL,
    SINGLE_PRODUCT_REQUEST_SUCCESS,
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

export const productReducer = (
    state = { products: [], singleProduct: {} },
    { type, payload }
) => {

    switch (type) {
        case PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case PRODUCT_REQUEST_SUCCESS:
            return {
                isLoading: false,
                products: payload
            }
        case PRODUCT_REQUEST_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case SINGLE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: false
            }
        case SINGLE_PRODUCT_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                singleProduct: payload
            }
        case SINGLE_PRODUCT_REQUEST_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload
            }

        case ADD_PRODUCT_REQUEST: return {
            ...state,
            isLoading: true
        }
        case ADD_PRODUCT_REQUEST_SUCCESS: return {
            ...state,
            isLoading: false,
            productAdded: true
        }
        case ADD_PRODUCT_REQUEST_FAIL: return {
            ...state,
            isLoadning: false,
            productAdded: false,
            error: payload,

        }

        case PRODUCT_UPDATE_REQUEST: return {
            ...state,
            isLoading: true
        }
        case PRODUCT_UPDATE_REQUEST_SUCCESS: return {
            ...state,
            productUpdate: true,
            isLoading: false
        }
        case PRODUCT_UPDATE_REQUEST_FAIL: return {
            ...state,
            productUpdate: false,
            error: payload,
            isLoading: false
        }
        case PRODUCT_DELETE_REQUEST: return {
            ...state,
            isLoading: true
        }
        case PRODUCT_DELETE_REQUEST_SUCCESS: return {
            ...state,
            isLoading: false,
            productDeleted: true
        }
        case PRODUCT_DELETE_REQUEST_FAIL: return {
            ...state,
            isLoading: false,
            error: payload
        }


        default: return state
    }

}