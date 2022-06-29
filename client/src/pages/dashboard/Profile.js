import { useState } from "react";
import InputAlert from "../../components/Alert";
import FormRow from "../../components/FormRow";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../wrappers/DashboardFormPage"

const Profile = () => {
    const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();

    console.log(user);

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [lastName, setLastName] = useState(user?.lastName);
    const [location, setLocation] = useState(user?.location);

    const updateUserHandler = (e) => {
        e.preventDefault();

        if (!name||!email||!lastName||!location) {
            displayAlert()
            return;
        }

        updateUser({name,email,lastName,location})
    }

    return (
        <Wrapper>
            <form className="form" onSubmit={updateUserHandler}>
                <h3>profile</h3>
                {showAlert && <InputAlert />}

                <div className="form-center">
                    <FormRow type="text" name="name" value={name} handleChange={(e)=>setName(e.target.value)} />
                
                    <FormRow type="email" name="email" value={email} handleChange={(e)=>setEmail(e.target.value)} />
                
                    <FormRow type="text" labelText="last name" name="lastName" value={lastName} handleChange={(e)=>setLastName(e.target.value)} />
                
                    <FormRow type="text" name="location" value={location} handleChange={(e) => setLocation(e.target.value)} />
                    
                    <button className="btn btn-block" disabled={isLoading}>
                        {isLoading?"Please wait...":"save changes"}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};
export default Profile;
