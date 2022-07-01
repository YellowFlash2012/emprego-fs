import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Spinner from "./Spinner";
import Wrapper from "../wrappers/JobsContainer"
import Job from "./Job";
import Pagination from "./Pagination";

const JobsContainer = () => {
    const {
        getAllJobs,
        jobs,
        totalJobs,
        page,
        isLoading,
        search,
        sort,
        searchType,
        searchStatus,
        numOfPages
    } = useAppContext();

    useEffect(() => {
        getAllJobs();
    }, [page, search, sort, searchType, searchStatus]);

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
            </h5>

            <div className="jobs">
                {jobs.map((job) => (
                    <Job key={job._id} {...job} />
                ))}
            </div>

            {numOfPages>1&&<Pagination />}
        </Wrapper>
    );
};
export default JobsContainer;
