import { message } from "antd";
import axios from "axios";
import React, { useContext, useReducer} from "react";
import { CLEAR_ALERT, DISPLAY_ALERT, LOGIN_USER_BEGIN, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_BEGIN, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, TOGGLE_SIDEBAR, UPDATE_USER_BEGIN, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS } from "./actions";
import reducer from "./reducer";


const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token"),
    userLocation: localStorage.getItem("location") || "",
    jobLocation: localStorage.getItem("location") || "",
    showSidebar:false
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type:CLEAR_ALERT})
        }, 3000);
    }

    // persisting user data via localStorage
    const addUserToLS = ({ user, token, location }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("location", location);
    }

    const removeUserFromLS = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("location");
    }

    const userRegistration = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN });

        try {
            const res = await axios.post("/api/v1/users", currentUser);

            const { user, token, location } = res.data;

            dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token, location } });

            addUserToLS({ user, token, location });

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token },
            });

            message.success(`Thank you for creating an account ${user.name}`)

            setTimeout(() => {
                window.location.href="/dashboard"
            }, 5000);

        } catch (error) {
            console.log(error.response);

            dispatch({ type: REGISTER_USER_FAIL, payload: { msg: error.response.data.msg } });

            message.error(error.response.data.msg);
        }
    }

    const userLogin = async(currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });

        try {
            const {data} = await axios.post("/api/v1/users/login", currentUser);

            const { user, token} = data;

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token },
            });

            addUserToLS({ user, token });

            message.success(`Welcome back, ${user.name}`);

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 5000);
        } catch (error) {
            console.log(error.response);

            dispatch({
                type: LOGIN_USER_FAIL,
                payload: { msg: error.response.data.msg },
            });

            message.error(error.response.data.msg);
        }
    }

    const toggleSidebar = () => {
        dispatch({type:TOGGLE_SIDEBAR})
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLS()

    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = axios.put("/api/v1/users", currentUser, {
                headers: {
                    AUthorization: `Bearer ${state.token}`
                }
            })

            const { user, location, token } = data;
            
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token, location } });

            addUserToLS({ user, token, location });

            message.success(`${user.name} was successfully updated!`)
            console.log(data);
        } catch (error) {
            console.error(error);

            if (error.response.status === 401) {
                logoutUser()
            };
            
            dispatch({ type: UPDATE_USER_FAIL, payload: { msg: error.response.data.msg } });

            message.error(error.response.data.msg);
        };
    };

    return (
        <AppContext.Provider
            value={{ ...state, displayAlert, userRegistration, userLogin, toggleSidebar, logoutUser, updateUser }}
        >
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext} 