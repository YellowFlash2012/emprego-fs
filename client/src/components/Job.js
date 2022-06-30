import moment from "moment"
import {FaBriefcase, FaCalendarAlt, FaLocationArrow} from "react-icons/fa"

import Wrapper from "../wrappers/Job"
import {Link} from "react-router-dom"
import { useAppContext } from "../context/appContext";
import JobInfo from "./JobInfo";

const Job = (props) => {
    const { setEditJob, deleteJob } = useAppContext();

    let date = moment(props.createdAt);
    date = date.format("MMM Do YYYY");

    return (
        <Wrapper>
            <header>
                <div className="main-icon">{props.company.charAt(0)}</div>

                <div className="info">
                    <h5>{props.position}</h5>
                    <p>{props.company}</p>
                </div>
            </header>

            <div className="content">
                <div className="content-center">
                    <JobInfo
                        icon={<FaLocationArrow />}
                        text={props.jobLocation}
                    />

                    <JobInfo icon={<FaCalendarAlt />} text={date} />

                    <JobInfo icon={<FaBriefcase />} text={props.jobType} />

                    <div className={`status ${props.status}`}>
                        {props.status}
                    </div>
                </div>

                <footer>
                    <div className="actions">
                        <Link
                            to="/dashboard/add-new-job"
                            className="btn edit-btn"
                            onClick={() => setEditJob(props._id)}
                        >
                            edit
                        </Link>

                        <button
                            type="btn"
                            className="btn delete-btn"
                            onClick={() => deleteJob(props._id)}
                        >
                            delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
};
export default Job;
