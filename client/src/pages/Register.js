import { useState } from "react";

import InputAlert from "../components/Alert";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";
import { useAppContext } from "../context/appContext";

import Wrapper from "../wrappers/RegisterPage"

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
    
}

const Register = () => {
    const [values, setValues] = useState(initialState);

    const { isLoading, showAlert, displayAlert, userRegistration,userLogin } =
        useAppContext();

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    }
    
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    
    const authHandler = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;

        if (!email || !password||(!isMember&&!name)) {
            displayAlert()

            return;
        }

        const currentUser = { name, email, password };

        if (isMember) {
            userLogin(currentUser)
        } else {
            userRegistration(currentUser)
        }
    }

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={authHandler}>
                <Logo />
                <h3>{values.isMember ? "Login" : "Register"}</h3>

                {showAlert && <InputAlert />}

                {!values.isMember && (
                    <FormRow
                        type="text"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}

                <FormRow
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                />

                <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                />

                <button type="submit" className="btn btn-block" disabled={isLoading}>
                    {values.isMember ? "Login" : "Register"}
                </button>

                <p>

                {values.isMember ?
                        "Don't have an account yet?"
                        : "Already have an account?"
                    } {""}
                <button type="button" className="member-btn" onClick={toggleMember}>
                    {values.isMember?"Register":"Login"}
                </button>
                    </p>
            </form>
        </Wrapper>
    );
};
export default Register;
