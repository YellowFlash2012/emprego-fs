import { message } from "antd";
import axios from "axios";
import React, { useContext, useReducer} from "react";
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS } from "./actions";
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

    return (
        <AppContext.Provider
            value={{ ...state, displayAlert, userRegistration }}
        >
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}