import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../wrappers/ErrorPage"
const Error = () => {
    return (
        <Wrapper className="full-page">
            <div>
                <FaExclamationTriangle className="text-danger" size="5rem" />
                
                <h3>Page Not Found!</h3>

                <p>The page you are looking for doesn't exist</p>

                <Link to="/">back home</Link>

            </div>
        </Wrapper>
    );
};
export default Error;
