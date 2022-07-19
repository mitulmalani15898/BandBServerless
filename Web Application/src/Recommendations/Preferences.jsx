import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./../utility/common";

const Preferences = () => {
    const [preferences, setPreferences] = useState({
        stay: 0,
        activity: {
            outdoor: false,
            indore: false,
            aviation: false,
            water: false,
        },
        interest: { natural: false, historical: false, entertainment: false },
        budget: 0,
        distance: 0,
    });

    const handleChange = ({ currentTarget: input }) => {
        let pref = { ...preferences };
        if (input.tagName === "SELECT") {
            // console.log(input.name);
            pref[input.name] = parseInt(input.value);
        } else {
            let names = input.name.split(".");
            pref[names[0]][names[1]] = !pref[names[0]][names[1]];
        }
        setPreferences(pref);
    };

    return (
        // isLoggedIn() && (
        <div className="container">
            <div className="row">
                <div className="col-3 p-3 text-end">
                    <label htmlFor="stay" className="form-label p-3">
                        Duration of Stay :
                    </label>
                </div>
                <div className="col-5 p-3">
                    <div className="p-3 px-2">
                        <select
                            name="stay"
                            className="form-select"
                            onChange={handleChange}
                            value={preferences.stay}
                        >
                            <option value="1">1 Day</option>
                            <option value="2">2 Days</option>
                            <option value="3">3 or more</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3 p-3 text-end">
                    <label htmlFor="activityType" className="form-label p-3">
                        Activity Type :
                    </label>
                </div>
                <div className="col-5 p-3">
                    <div id="activityType" className="p-3">
                        <div className="form-check p-3 pt-1">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="activity.outdoor"
                                onChange={handleChange}
                                checked={preferences.activity.outdoor}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                            >
                                Outdoor
                            </label>
                        </div>
                        <div className="form-check p-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="activity.indore"
                                onChange={handleChange}
                                checked={preferences.activity.indore}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                            >
                                Indore
                            </label>
                        </div>
                        {/* <div className="form-check p-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="activity.aviation"
                onChange={handleChange}
                checked={preferences.activity.aviation}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Aviation
              </label>
            </div>
            <div className="form-check p-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="activity.water"
                onChange={handleChange}
                checked={preferences.activity.water}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Water
              </label>
            </div> */}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-3 p-3 text-end">
                    <label htmlFor="InterestType" className="form-label p-3">
                        Type of Interests :
                    </label>
                </div>
                <div className="col-5 p-3">
                    <div id="InterestType" className="p-3">
                        <div className="form-check p-3 pt-1">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="interest.natural"
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                            >
                                Natural Places
                            </label>
                        </div>
                        <div className="form-check p-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="interest.historical"
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                            >
                                Historical Places
                            </label>
                        </div>
                        <div className="form-check p-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="interest.entertainment"
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                            >
                                Entertainment
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-3 p-3 text-end">
                    <label htmlFor="budget" className="form-label p-3">
                        Budget Range :
                    </label>
                </div>
                <div className="col-5 p-3">
                    <div className="p-3 px-2">
                        <select
                            className="form-select"
                            name="budget"
                            onChange={handleChange}
                        >
                            <option value="1">100$-250$</option>
                            <option value="2">250$-500$</option>
                            <option value="3">500$ or more</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3 p-3 text-end">
                    <label htmlFor="distance" className="form-label p-3">
                        Distance Range :
                    </label>
                </div>
                <div className="col-5 p-3">
                    <div className="p-3 px-2">
                        <select
                            className="form-select"
                            name="distance"
                            onChange={handleChange}
                        >
                            <option value="1">0-25 Miles</option>
                            <option value="2">25-50 Miles</option>
                            <option value="3">50-100 Miles</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        // ) || (!isLoggedIn() && <Navigate to="/" replace />)
    );
};

export default Preferences;
