import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import vasServices from "../../Services/vasServices";
import dataplan from "../Plans/dataPlans.json";
import { useWallet } from "../../Components/Wallet";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner

const BuyData = (props) => {
  const { handleSubmit, register, watch } = useForm();
  const { state, reduceWallet } = useWallet();
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [amountToPay, setAmountToPay] = useState(0);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [transactionDetails, setTransactionDetails] = useState({
    network: "",
    planTitle: "", // Added planTitle to transactionDetails
    mobile_number: "",
    amount: 0,
  });

  const balance = state.balance;

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    window.location.reload(); // Reload the page when the modal is closed
  };

  const dataBundle = async (data) => {
    const { mobile_number } = data;

    if (balance < amountToPay) {
      setMessage("Insufficient balance");
    } else {
      // Find the selected plan to get its title
      const selectedPlan = dataplan[selectedNetwork].find((plan) => plan.id === selectedPlanId);

      // Set transaction details for the modal
      setTransactionDetails({
        network: selectedNetwork,
        planTitle: selectedPlan ? selectedPlan.title : "", // Set the plan title
        mobile_number,
        amount: amountToPay,
      });

      // Show the modal
      handleShow();
    }
  };

  const handleProceed = async () => {
    setLoading(true); // Start loading

    try {
      const data = {
        network: selectedNetwork,
        plan: selectedPlanId, // Send plan ID
        mobile_number: watch("mobile_number"),
        amount: amountToPay,
      };

      let response = await vasServices.dataBundle(data);

      if (response.error) {
        setMessage("Transaction unsuccessful");
      } else {
        setMessage(response.api_response || "Transaction successful");
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error occurred during transaction:", error);
      setMessage("Transaction unsuccessful");
    }
    setLoading(false); // Stop loading
    // setTimeout(() => {
    //   handleClose();
    //   window.location.reload(); // Reload the page when the modal is closed
    // }, 5000);
  };

  const handleNetworkChange = (event) => {
    const network = event.target.value;
    setSelectedNetwork(network);
    setSelectedPlanId("");
    setAmountToPay(0);
  };

  const handlePlanChange = (event) => {
    const planId = event.target.value;
    setSelectedPlanId(planId);
    updateAmountToPay(planId);
  };

  const updateAmountToPay = (planId) => {
    if (selectedNetwork && planId) {
      const selectedPlans = dataplan[selectedNetwork];
      const selectedPlan = selectedPlans.find((plan) => plan.id === planId);

      if (selectedPlan) {
        const amount = parseFloat(selectedPlan.amount);
        const amountToPay = Math.round((amount + amount * 0.2) * 100) / 100; // Add 20% and round to 2 decimal places
        setAmountToPay(amountToPay);
      }
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <Container className="BuyData-main">
        <div className="BuyData-submain Form-submain">
          <Row>
            <Col sm={8} xs={{ order: "" }} className="BuyData-form">
              {message && <div className="alert alert-info">{message}</div>}
              <Form onSubmit={handleSubmit(dataBundle)}>
                <Form.Label className="label">Network</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3"
                  {...register("network")}
                  onChange={handleNetworkChange}
                  required
                >
                  <option value="">Select a network</option>
                  <option value="1">MTN</option>
                  <option value="2">GLO</option>
                  <option value="3">Airtel</option>
                  <option value="4">9mobile</option>
                </Form.Select>
                <Form.Label className="label">Plan</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3"
                  {...register("plan")}
                  value={selectedPlanId}
                  onChange={handlePlanChange}
                  required
                >
                  <option value="">Select a plan</option>
                  {selectedNetwork &&
                    dataplan[selectedNetwork].map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.title}
                      </option>
                    ))}
                </Form.Select>
                <Form.Group>
                  <Form.Label className="label phone-label">Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    className="mb-3"
                    required
                    {...register("mobile_number")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="label phone-label">Amount to pay</Form.Label>
                  <Form.Control
                    type="text"
                    value={amountToPay}
                    readOnly
                    className="mb-3"
                  />
                </Form.Group>
                <Button className="Buy-now-btn" type="submit">
                  Buy Now
                </Button>
                {/* Modal for displaying transaction details */}
                <Modal
                  show={showModal}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Transaction Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {message && <div className='alert alert-info'>{message}</div>}
                    <p>
                      You're about to buy {transactionDetails.planTitle} data worth ₦
                      {transactionDetails.amount} to{" "}
                      {transactionDetails.mobile_number}
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleProceed}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" /> Proceeding...
                        </>
                      ) : (
                        "Proceed"
                      )}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form>
            </Col>
            <Col sm={4} xs={{ order: "" }}>
              sm=4
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default BuyData;
