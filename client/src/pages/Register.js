import { useState } from "react";
import { Link } from "react-router-dom";
import InputAlert from "../components/Alert";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";
import Wrapper from "../wrappers/RegisterPage"

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
    showAlert:false
}

const Register = () => {
    const [values, setValues] = useState(initialState);

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    }
    
    const handleChange=()=>{}
    
    const authHandler = () => { }
    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={authHandler}>
                <Logo />
                <h3>{values.isMember ? "Login" : "Register"}</h3>

                {values.showAlert && <InputAlert />}

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

                <button className="btn btn-block">Submit</button>

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
