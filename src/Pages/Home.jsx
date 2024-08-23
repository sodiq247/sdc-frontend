/** @format */

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Home() {
	return (
		<Container className="">
			<Row>
				<Col sm={8}>sm=8</Col>
				<Col sm={4}>sm=4</Col>
			</Row>
			<Row>
				<Col sm>sm=true</Col>
				<Col sm>sm=true</Col>
				<Col sm>sm=true</Col>
				<Col>
					<Button>Click Me</Button>
				</Col>{" "}
				{/* Use Button component from react-bootstrap */}
			</Row>
		</Container>
	);
}

export default Home;
