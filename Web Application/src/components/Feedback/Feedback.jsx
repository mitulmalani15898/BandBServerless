import "bootstrap/dist/css/bootstrap.css";
import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utility/common";
import {
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Button,
} from "@mui/material";

import TextField from "@mui/material/TextField";
const Feedback = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        booking: [],
        title: "",
        description: "",
    });

    const handleFieldsChange = (e) => {
        const { currentTarget: input } = e;
        let fieldsObj = { ...fields };
        if (input === undefined || input === null)
            fieldsObj[e.target.name] = e.target.value;
        else fieldsObj[input.name] = input.value;
        setFields(fieldsObj);
    };

    const handleSubmit = (event) => {
        // console.log(event);
        console.log(fields);
        event.preventDefault();
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div
                    className="bg-dark p-2 mt-5"
                    style={{
                        borderRadius: "15px",
                    }}
                >
                    <h3
                        style={{
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        Your Feedback is valuable for us to improve our services
                        to serve you better
                    </h3>
                </div>
            </div>
            <br />
            <br />
            <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
                <FormControl
                    sx={{
                        width: "100%",
                    }}
                >
                    <InputLabel id="bookings">Previous Bookings</InputLabel>
                    <Select
                        labelId="bookings"
                        name="booking"
                        value={fields.booking}
                        label="Previous Bookings"
                        placeholder="Ex: 2-bed delux 15-12-2021"
                        onChange={handleFieldsChange}
                        sx={{ backgroundColor: "#fff !important" }}
                    >
                        <MenuItem value={0}>Select a booking</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5 or more</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <br />
            <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
                <TextField
                    id="title"
                    name="title"
                    label="Feedback Title"
                    variant="outlined"
                    placeholder="Ex: Good Food services from kitchen"
                    fullWidth
                    value={fields.name}
                    onChange={handleFieldsChange}
                />
            </div>
            <br />
            <div style={{ paddingLeft: "25px", marginTop: "15px" }}>
                <TextField
                    id="description"
                    name="description"
                    label="Detailed Feedback"
                    multiline
                    rows={6}
                    placeholder="Ex: Kitchen is fully loaded with a wide variety of food items. especially the italian cuisine is the best"
                    fullWidth
                    value={fields.description}
                    onChange={handleFieldsChange}
                />
            </div>
            <br />
            <br />
            <div
                className="d-flex justify-content-center"
                style={{ paddingLeft: "25px", marginTop: "15px" }}
            >
                <Stack
                    spacing={5}
                    direction="row"
                    sx={{ width: "fit-content" }}
                >
                    <Button
                        sx={{ backgroundColor: "black", color: "white" }}
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button
                        sx={{ backgroundColor: "gray", color: "white" }}
                        variant="contained"
                        onClick={() => {
                            navigate("/feed/posts");
                        }}
                    >
                        Cancel
                    </Button>
                </Stack>
            </div>
            <br />
            <br />
        </div>
    );
};

export default Feedback;
