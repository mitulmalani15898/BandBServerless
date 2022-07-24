import axios from "axios";
import Axios from "axios";
import { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardGroup,
	Container,
	Form,
	Row,
	Table,
} from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import FoodCard from "./FoodCard";
import { useNavigate } from "react-router-dom";
import * as HotelMgmtConstants from "./HotelMgmtConstants";

const dates = ["7/24", "7/25", "7/26", "7/27"];

export default function KitchenOrders(props) {
	const [invItems, setInvItems] = useState([]);
	const [orderItems, setOrderItems] = useState([]);
	const [selectedDate, setSelectedDate] = useState();
	const { currentUser } = useContext(AuthContext);
	const [pastBookings, setPastBookings] = useState([]);
	const [upcomingBookings, setUpcomingBookings] = useState([]);

	const navigate = useNavigate();
	const processBookings = (bookings) => {
		const now = new Date();
		let pastBookings = [];
		let upcomingBookings = [];
		bookings.map((booking) => {
			if (booking.checkOut < now) {
				pastBookings.push(booking);
			} else {
				upcomingBookings.push(booking);
			}
		});
		setPastBookings(pastBookings);
		setUpcomingBookings(upcomingBookings);
		console.log("Total past bookings " + pastBookings.length);
		console.log("Total upcoming bookings " + upcomingBookings.length);
		console.log(upcomingBookings);
		if (upcomingBookings.length <= 0) {
			navigate("/rooms");
		}
	};

	useEffect(() => {
		const getInventory = async () => {
			const inv = (
				await axios.get(
					"https://gb4hi5fgpb.execute-api.us-east-1.amazonaws.com/prod/hotel/inventory"
				)
			).data.data;

			setInvItems(inv);
		};

		getInventory();

		var userId = "";
		if (currentUser) {
			userId = currentUser.userId;
		} else {
			alert("You are not logged-in, please login to proceed further");
			navigate("/login");
		}
		console.log("User Id is :" + userId);
		const getBookingsUri =
			HotelMgmtConstants.apiBaseUrl + `/hotel/bookings?userId=${userId}`;

		Axios.get(getBookingsUri)
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					processBookings(response.data.bookings);
				} else if (response.status === 404) {
					navigate("/rooms");
				}
			})
			.catch((error) => {
				console.log("Error in fetching the room bookings");
				navigate("/rooms");
			});
	}, []);

	const addItem = (item) => {
		const oi = orderItems;
		const found = oi.findIndex((fi) => fi._id === item._id);
		if (found === -1) {
			setOrderItems([...orderItems, item]);
		} else {
			oi[found].quantity++;
			setOrderItems([...oi]);
		}
		console.log(orderItems);
	};

	const fireOrder = async () => {};

	return (
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			<div
				style={{
					padding: "20px",
					display: "flex",
					flexWrap: "wrap",
					flexGrow: 1,
				}}
			>
				<CardGroup>
					{invItems.map((item) => (
						<FoodCard item={item} addItem={addItem} />
					))}
				</CardGroup>
			</div>
			<div
				style={{
					width: "300px",
					marginTop: "20px",
					marginRight: "20px",
					overflowY: "scroll",
					height: "80vh",
				}}
			>
				<Card
					style={{
						paddingRight: "20px",
						paddingBottom: "20px",
						paddingLeft: "20px",
						borderWidth: "2px",
					}}
				>
					<div
						style={{
							marginTop: "10px",
							marginBottom: "10px",
							fontSize: "large",
						}}
					>
						<strong>Selected items</strong>
					</div>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>Cost</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>
							{orderItems.map((item) => (
								<tr>
									<td>{item.name.slice(0, 5) + "..."}</td>
									<td>${item.cost}</td>
									<td>{item.quantity}</td>
								</tr>
							))}
							<tr>
								<td colSpan={3}>
									<div
										style={{ display: "flex", justifyContent: "space-between" }}
									>
										<strong>Total: </strong>
										<div
											style={{
												width: "100px",
												color: "green",
												fontWeight: "bold",
											}}
										>
											$
											{orderItems
												.reduce(
													(acc, curr) =>
														acc +
														parseFloat(curr.cost) * parseInt(curr.quantity),
													0.0
												)
												.toFixed(2)}
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</Table>
					<Form.Select>
						<option>Booking 1</option>
						<option>Booking 2</option>
					</Form.Select>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							marginTop: "15px",
							marginBottom: "15px",
							justifyContent: "space-around",
						}}
					>
						{dates.map((date) => (
							<div
								className="pointer"
								style={{
									fontSize: "small",
									borderRadius: "5px",
									border: "1px solid gray",
									backgroundColor: `${
										selectedDate === date ? "lightgreen" : "white"
									}`,
									color: `${selectedDate === date ? "green" : "black"}`,
									fontWeight: `${selectedDate === date ? "bold" : ""}`,
									margin: "5px",
									padding: "5px",
								}}
								key={date}
								onClick={() => setSelectedDate(date)}
							>
								{date}
							</div>
						))}
					</div>
					<Button onClick={fireOrder}>Order</Button>
				</Card>
			</div>
		</div>
	);
}
