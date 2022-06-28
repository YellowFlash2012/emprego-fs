import { message } from "antd";
import { useState } from "react";
import {FaAlignLeft, FaCaretDown, FaUserCircle} from "react-icons/fa"
import { useAppContext } from "../context/appContext";

import Wrapper from "../wrappers/Navbar"
import Logo from "./Logo";
const Navbar = () => {
    const { toggleSidebar, logoutUser, user } = useAppContext();

    const [showLogout, setShowLogout] = useState(false);

    return (
        <Wrapper>
            <div className="nav-center">
                <button onClick={toggleSidebar} type="button" className="toggle-btn">
                    <FaAlignLeft />
                </button>

                <div>
                    <Logo />
                    <h3 className="logo-text">dashboard</h3>
                </div>

                <div className="btn-container">
                    <button onClick={()=>setShowLogout(!showLogout)} type="button" className="btn">
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>

                    <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
                        <button type="button" className="dropdown-btn" onClick={() => {
                            logoutUser()
                            message.success(`See you next time, ${user.name}`)
                        }}>
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};
export default Navbar;
