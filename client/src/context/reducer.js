import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS } from "./actions";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {...state,showAlert:true,alertType:"error",alertText:"Please provide all values!"}
    }
    
    if (action.type === CLEAR_ALERT) {
        return {...state,showAlert:false,alertType:"",alertText:""}
    }

    if (action.type===REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type===REGISTER_USER_SUCCESS) {
        return {...state, isLoading:false,token:action.payload.token,user:action.payload.user,userLocation:action.payload.location,jobLocation:action.payload.location}
    }

    if (action.type===REGISTER_USER_FAIL) {
        return {...state,isLoading:false}
    }

    throw new Error(`no such ${action.type}`)
};

export default reducer;