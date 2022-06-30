import { ADD_JOB_BEGIN, ADD_JOB_FAIL, ADD_JOB_HANDLE_CHANGE, ADD_JOB_SUCCESS, CLEAR_ADD_JOB_VALUES, CLEAR_ALERT, DISPLAY_ALERT, LOGIN_USER_BEGIN, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_BEGIN, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, TOGGLE_SIDEBAR, UPDATE_USER_BEGIN, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS } from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return { ...state, showAlert: true, alertType: "error", alertText: "Please provide all values!" }
    }
    
    if (action.type === CLEAR_ALERT) {
        return { ...state, showAlert: false, alertType: "", alertText: "" }
    }

    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return { ...state, isLoading: false, token: action.payload.token, user: action.payload.user, userLocation: action.payload.location, jobLocation: action.payload.location }
    }

    if (action.type === REGISTER_USER_FAIL) {
        return { ...state, isLoading: false }
    }
    
    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return { ...state, isLoading: false, token: action.payload.token, user: action.payload.user, userLocation: action.payload.location, jobLocation: action.payload.location }
    }

    if (action.type === LOGIN_USER_FAIL) {
        return { ...state, isLoading: false }
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return { ...state, showSidebar: !state.showSidebar }
    }

    if (action.type === LOGOUT_USER) {
        return { ...initialState, user: null, token: null, jobLocation: "", userLocation: "" };
    }

    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
        };
    }

    if (action.type === UPDATE_USER_FAIL) {
        return { ...state, isLoading: false };
    }

    if (action.type === ADD_JOB_HANDLE_CHANGE) {
        return { ...state, [action.payload.name]: action.payload.value };
    };

    if (action.type===CLEAR_ADD_JOB_VALUES) {
        const initialState = {
            isEditing: false,
            editJobIt: "",
            position: "",
            company: "",
            jobLocation:state.userLocation,
            
            jobType: "full-time",
            
            status: "pending",
        };

        return { ...state, ...initialState };
    }

    if (action.type === ADD_JOB_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === ADD_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            
        };
    }

    if (action.type === ADD_JOB_FAIL) {
        return { ...state, isLoading: false };
    }

    throw new Error(`no such ${action.type}`)
};

export default reducer;