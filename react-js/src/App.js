import React from "react";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import "./App.css";
import Main from "./components/main";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faPlusCircle,
  faHome,
  faQuestion,
  faMailBulk,
  faPhone,
  faSignInAlt,
  faComment,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="demo-big-content">
      <Layout>
        <Header
          className="header-color1"
          title={
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Smart Farming
            </Link>
          }
          scroll
        >
          <Navigation>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} style={{ marginRight: "10px" }} />
              Home
            </Link>
            <Link to="/message">
              <FontAwesomeIcon
                icon={faMailBulk}
                style={{ marginRight: "10px" }}
              />
              Send Message
            </Link>
            <Link to="/faq">
              <FontAwesomeIcon
                icon={faQuestion}
                style={{ marginRight: "10px" }}
              />
              FAQ
            </Link>
            <Link to="/forum">
              <FontAwesomeIcon
                icon={faComment}
                style={{ marginRight: "10px" }}
              />
              Community
            </Link>
            <Link to="/library">
              <FontAwesomeIcon
                icon={faDatabase}
                style={{ marginRight: "10px" }}
              />
              Library
            </Link>
            <Link to="/sendNotification">
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ marginRight: "10px" }}
              />
              Send Notification
            </Link>
            <Link to="/contactus">
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: "10px" }} />
              Contact Us
            </Link>
            <Link
              to="/alogin"
              style={{ backgroundColor: "white", color: "green" }}
            >
              <FontAwesomeIcon
                icon={faSignInAlt}
                style={{ marginRight: "10px" }}
              />
              Login
            </Link>
          </Navigation>
        </Header>
        <Drawer
          title={
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              Welcome
            </Link>
          }
        >
          <Navigation>
            <Link to="/viewPlants">
              <FontAwesomeIcon icon={faDatabase} /> View Plant Details{" "}
            </Link>
            <Link to="/addPlant">
              <FontAwesomeIcon icon={faPlusCircle} /> Add Plant Details
            </Link>
            <Link to="/pests">
              <FontAwesomeIcon icon={faDatabase} /> View Pest Details
            </Link>
            <Link to="/addPest">
              <FontAwesomeIcon icon={faPlusCircle} /> Add Pest Details
            </Link>
            <Link to="/addDisease">
              <FontAwesomeIcon icon={faPlusCircle} /> Add Disease
            </Link>
            <Link to="/viewUsers">
              <FontAwesomeIcon icon={faDatabase} /> View Users
            </Link>
            <Link to="/viewExperts">
              <FontAwesomeIcon icon={faDatabase} /> View Experts
            </Link>
          </Navigation>
        </Drawer>

        <Content>
          <div className="page-content" />

          <Main />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
