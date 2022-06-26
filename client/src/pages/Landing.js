import Logo from "../components/Logo";
import Wrapper from "../wrappers/LandingPage"

const Landing = () => {
    return <Wrapper>
        <nav>
            <Logo/>
        </nav>

        <div className="container page">
            <div className="info">
                <h1>job <span>tracking</span> app</h1>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis obcaecati expedita sunt, accusantium cupiditate optio nihil distinctio porro reiciendis fugit voluptate molestiae, similique laboriosam impedit doloribus ea tenetur, aut sapiente tempore nam velit. Distinctio quod assumenda a! Molestiae saepe vel, eaque incidunt veritatis iure eveniet officiis tenetur officia ipsam quod.</p>

                <button className="btn btn-hero">
                    Login/Register
                </button>
            </div>

            <img src="images/main.svg" alt="" className="img main-img" />
        </div>
    </Wrapper>;
};


export default Landing;