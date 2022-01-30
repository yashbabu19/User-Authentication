import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const ProfileScreen = ({ location, history }) => {
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setfirstName(userInfo.firstname);
      setaddress(userInfo.address);
      setEmail(userInfo.email);
      setphone(userInfo.phone);
    }
  }, [history, userInfo]);

 
   return (
    <MainScreen title="USER PROFILE">
         <div>
         <Row className="profileContainer">
         <Col md={4}>
           <p>
             name:{userInfo.firstname}
           </p>
           <p>
             phone:{userInfo.phone}
           </p>
           <p>
             address:{userInfo.address}
           </p>
           <p>
             email:{userInfo.email}
           </p>
           </Col>
           <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
           
          </Col>
           </Row>
          
         </div>
 
    </MainScreen>
  );
};

export default ProfileScreen;
