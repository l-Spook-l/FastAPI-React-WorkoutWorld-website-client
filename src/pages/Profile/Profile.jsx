import React, { useContext, useState } from 'react'
import { Alert, Col, Container, Nav, Row } from 'react-bootstrap'
import style from './Profile.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from "../..";
import { useLocation } from 'react-router-dom';

const Profile = observer(() => {
  const { user } = useContext(Context);

  const location = useLocation();

  const state = location.state;

  const [activeTab, setActiveTab] = useState("userInfo");

  //const [view, setView] = useState(<UserInfo />);
  const [view, setView] = useState('userInfo');

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   blurHandler(state);
  // }, [state]);

  const blurHandler = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "userInfo":
        //setView(<UserInfo />);
        break;
      case "basket":
        //setView(<Basket />);
        break;
      case "wishlist":
        //setView(<Wishlist />);
        break;
      case "subscribe":
        //setView(<Subscribes />);
        break;
      case "wallet":
        //setView(<Wallet />);
        break;
      case "orders":
        //setView(<Orders />);
        break;
    }
  };

  return (
    <Container className={style.forContainer}>
      <Row className="">
        <Col md={3} className={style.blockWithMenu}>
          <Nav className="d-flex flex-column">
            <Alert
              className={`${style.alertMenu} ${activeTab === "userInfo" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("userInfo")}
            >
              {user.user.first_name} {user.user.last_name}
              <span>{user.user.email}</span>
            </Alert>
            <hr />
            <Alert
              className={`${style.alertMenu} ${activeTab === "basket" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("basket")}
            >
              Basket
            </Alert>
            <Alert
              className={`${style.alertMenu} ${activeTab === "wishlist" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("wishlist")}
            >
              Wishlist
            </Alert>
            <Alert
              className={`${style.alertMenu} ${activeTab === "subscribe" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("subscribe")}
            >
              Subscriptions
            </Alert>
            <Alert
              className={`${style.alertMenu} ${activeTab === "wallet" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("wallet")}
            >
              Wallet
            </Alert>
            <Alert
              className={`${style.alertMenu} ${activeTab === "orders" ? style.alertMenuActive : ""}`}
              onClick={() => blurHandler("orders")}
            >
              My orders
            </Alert>
          </Nav>
        </Col>
        <Col md={9}>{view}</Col>
      </Row>
    </Container>
  )
})

export default Profile