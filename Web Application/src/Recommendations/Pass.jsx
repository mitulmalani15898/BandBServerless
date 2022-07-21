import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./../utility/common";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../providers/AuthProvider";

const Pass = () => {
    // if (!isLoggedIn()) <Navigate to="/" replace />;

    const { currentUser } = useContext(AuthContext);
    debugger;
    const userId = "shiva";

    const [fields, setFields] = useState({
        firstname: "Shiva Shankar",
        lastname: "Pandillapalli",
        fromdate: "18-07-2022",
        todate: "25-04-2022",
        tour: "Day Tour Niagara Falls",
        cost: "200 CAD $",
        persons: "4",
    });

    useEffect(() => {
        axios
            .get("", { userId })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => console.log(error));
    });

    return (
        <div className="container" style={{ height: "100vh", display: "flex" }}>
            <div
                style={{
                    // height: 756,
                    // width: 1344,
                    height: 702,
                    width: 1248,
                    // height: 648,
                    // width: 1152,
                    background: `url("https://res.cloudinary.com/hackerrank/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency//v1658150645/pass_qhmach.jpg")`,
                    // backgroundSize: "1134px 756px",
                    // backgroundSize: "1152px 648px",
                    backgroundSize: "1248px 702px",
                    // backgroundSize: "960px 540px",
                    // height: 540,
                    // width: 960,
                    margin: "auto",
                    color: "#FFB93F",
                    // color: "#FFF",
                    // marginTop: "100px",
                    // padding: "150px 150px 0 200px",
                    padding: "175px 150px 0 200px",
                    fontSize: 22,
                }}
            >
                <div style={{ verticalAlign: "middle" }}>
                    <div className="row mb-5">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label">
                                    First name :{" " + fields.firstname}
                                </label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label">
                                    Last name :{" " + fields.lastname}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-outline mb-5">
                        <label className="form-label">
                            Company name : B&B Tour Services
                        </label>
                    </div>

                    <div className="form-outline mb-5">
                        <label className="form-label">
                            Tour Package : {" " + fields.tour}
                        </label>
                    </div>

                    <div className="form-outline mb-5">
                        <label className="form-label">
                            Total Number of Persons : {" " + fields.persons}
                        </label>
                    </div>

                    <div className="form-outline mb-5">
                        <label className="form-label">
                            Cost : {" " + fields.cost + " per person"}
                        </label>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label">
                                    Valid From : {" " + fields.fromdate}
                                </label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label">
                                    Valid To : {" " + fields.todate}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pass;
