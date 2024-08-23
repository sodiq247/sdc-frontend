/** @format */

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Container, Navbar } from "react-bootstrap";
import MobileSidebar from "./MoblieSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Header() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Navbar className="main ">
			<Container>
				<Navbar.Brand href="" className="title">
					<Link to="/Dashboard">Supremedata</Link>
				</Navbar.Brand>
				<Button onClick={handleShow} className="mobile faBars-btn">
					<FontAwesomeIcon icon={faBars} className="faBars" />
				</Button>
				<Offcanvas show={show} onHide={handleClose}>
					<Offcanvas.Header closeButton />
					<Offcanvas.Body>
						<MobileSidebar />
					</Offcanvas.Body>
				</Offcanvas>
			</Container>
		</Navbar>
	);
}

export default Header;
