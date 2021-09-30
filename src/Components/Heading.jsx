import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";


import{AuthContext} from "../context/auth/AuthContext"
import { types } from "../context/types";


import { FiLogOut } from "react-icons/fi"
import { FaUserCircle } from "react-icons/fa"

import { Nav } from "react-bootstrap";
import { Image } from "react-bootstrap";

import { SignUpModal } from "./Modal/SignUp"
import {ModalLog} from "./Modal/Login";


import logo from "../Image/logo.png";

const Heading = () => {

  let token = localStorage.getItem("token");

  const { dispatch, user } = useContext(AuthContext);


  const history = useHistory();

  const logout = () => {
   history.replace("/");
    localStorage.removeItem("token");   
    dispatch({
      type: types.logout,
    });
  }


  return (
    <Nav
      className="shadow mb-4 w-100  d-flex align-items-center justify-content-between px-3"
      activeKey="/"
      style={{ background: "#121212" }}
    >
      <div className="d-flex">
        <Image src={logo} height={80} width={80} />
        <h5 className="fw-bold m-auto " style={{ color: "#f8f8f2" }}>
          Coin
          <span style={{ color: "#ffb86c" }}> Cp</span>
        </h5>
      </div>
      <div className="d-flex align-items-center fw-bold ">
        <Nav.Item>
          <Link to="/" className="mx-2  btn-default text-decoration-none pb-2 ">
            Inicio
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/coins" className="mx-2  btn-default text-decoration-none pb-2">
            Monedas
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="markets" className="mx-2  btn-default text-decoration-none pb-2">
            Mercados
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/nft" className="mx-2  btn-default text-decoration-none pb-2">
            NFT
          </Link>
        </Nav.Item>
      </div>

      <div className="">
        {/* <input
          type="text"
          name="buscar"
          placeholder="Buscar"
          className="border-3 border-white rounded p-1 bg-dark"
          style={{ color: "#f8f8f2" }}
        /> */}

        {token ? (
          <div className="d-flex align-items-center justify-content-center my-auto">
            <h5 className="my-auto">Bienvenido <span style={{color: "#033f57"}}>{user.user.user_name}</span></h5>
            <FaUserCircle className="fs-4 mx-3" />
            <button
              className="mx-2 login"
              onClick={ logout }
            >
              <FiLogOut />
            </button>
          </div>
        ) : (
          <div>
            <ModalLog />
            <SignUpModal />
          </div>
        )}
      </div>
    </Nav>
  );
};

export default Heading;
