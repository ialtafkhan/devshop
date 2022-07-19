import {
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_REQUEST_SUCCESS,
    ADMIN_PRODUCT_REQUEST_FAIL

} from "./../../constants/adminContstants"
// admin
import axios from "axios"
export const adminProductAction = () => async (dispatch, getState) => {
    try {
        const config = {
            headers: {
                "Authorization": getState().user.login.token
            }
        }
        dispatch({ type: ADMIN_PRODUCT_REQUEST })
        const { data } = await axios.get("/product/admin/product", config)
        dispatch({
            type: ADMIN_PRODUCT_REQUEST_SUCCESS,
            payload: data.result
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_REQUEST_FAIL,
            payload: error
        })

    }
}
