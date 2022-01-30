import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";

function RegisterScreen({ history }) {
 
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

 

  useEffect(() => {
    if (userInfo) {
      history.push("/profile");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

     dispatch(register(firstname, lastname, phone,address,email, password));
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {/* {message && <ErrorMessage variant="danger">{message}</ErrorMessage>} */}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="firstname">
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              type="name"
              value={firstname}
              placeholder="Enter firstname"
              onChange={(e) => setfirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              type="name"
              value={lastname}
              placeholder="Enter lastname"
              onChange={(e) => setlastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="number">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              value={phone}
              placeholder="Enter Phone number"
              onChange={(e) => setphone(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="name"
              value={address}
              placeholder="Enter Adress"
              onChange={(e) => setaddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

         
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;
