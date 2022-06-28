import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import links from "../utils/links";

const NavLinks = ({toggleSidebar}) => {
    // const { toggleSidebar } = useAppContext();
    return (
        <div className="nav-links">
            {links.map((link) => (
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                    to={link.path}
                    key={link.id}
                    onClick={toggleSidebar}
                >
                    <span className="icon">{link.icon}</span>
                    {link.text}
                </NavLink>
            ))}
        </div>
    );
};
export default NavLinks;
