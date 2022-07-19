import { Navbar } from "reactstrap";

const Footer = () => {
    return (
        <Navbar
            color="dark"
            dark
            expand="md"
            style={{
                position: "fixed",
                width: "100%",
                bottom: "0px",
            }}
        >
            <div className="container">
                <div
                    className="text-center p-2 d-flex justify-content-center text-white"
                    // style={{ backgroundCcolor: "rgba(0, 0, 0, 0.2)" }}
                >
                    © 2020 Copyright :
                    <a className="text-white" href="/">
                        : B&B Hotel
                    </a>
                </div>
            </div>
        </Navbar>
    );
};

export default Footer;
