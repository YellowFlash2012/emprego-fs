import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Spinner from "./Spinner";
import Wrapper from "../wrappers/JobsContainer"
import Job from "./Job";

const JobsContainer = () => {
    const { getAllJobs, jobs, totalJobs, page, isLoading } = useAppContext();

    useEffect(() => {
        getAllJobs()
    }, [getAllJobs]);

    if (isLoading) {
        <Spinner center />;
    }

    if (jobs.length === 0) {
        <Wrapper>
            <h2>No jobs for now, add one quick!</h2>
        </Wrapper>
    }

    return (
        <Wrapper>
            <h5>
                {totalJobs} job{jobs.length > 1 && "s"} found!
                
                {jobs.map(job=><Job key={job._id} {...job} />)}
            </h5>
            
        </Wrapper>
    );
};
export default JobsContainer;
