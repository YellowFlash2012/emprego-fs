import InputAlert from "../../components/Alert";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../wrappers/DashboardFormPage";

const AddNewJob = () => {
    const {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        newJobHandleChange,
        clearAddJobValues,
        addNewJob,
    } = useAppContext();

    const addEditJobHandler = e => {
        e.preventDefault();

        if (!position||!company||!jobLocation) {
            displayAlert();
            return;
        }

        if (isEditing) {
            return;
        }

        addNewJob();
    }
    
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        console.log(name, value);
        
        newJobHandleChange({name,value})
    }

    return (
        <Wrapper>
            <form className="form" onSubmit={addEditJobHandler}>
                <h3>{isEditing ? "edit job" : "add new job"}</h3>
                {showAlert && <InputAlert />}

                <div className="form-center">
                    <FormRow
                        type="text"
                        name="position"
                        value={position}
                        handleChange={handleInputChange}
                    />

                    <FormRow
                        type="text"
                        name="company"
                        value={company}
                        handleChange={handleInputChange}
                    />

                    <FormRow
                        type="text"
                        labelText="job location"
                        name="jobLocation"
                        value={jobLocation}
                        handleChange={handleInputChange}
                    />

                    <FormRowSelect
                        name="status"
                        value={status}
                        handleChange={handleInputChange}
                        lists={statusOptions}
                    />

                    <FormRowSelect
                        name="jobType"
                        labelText="job type"
                        value={jobType}
                        handleChange={handleInputChange}
                        lists={jobTypeOptions}
                    />

                    <div className="btn-container">

                        <button
                            className="btn btn-block clear-btn"
                            onClick={()=>clearAddJobValues()}
                            type="button"
                        >
                            clear values
                        
                        </button>
                        
                        <button className="btn btn-block submit-btn" disabled={isLoading}>
                            {isEditing ? "save changes" : "add job"}
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};
export default AddNewJob;
