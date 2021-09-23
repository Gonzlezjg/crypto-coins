import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";


import{AuthContext} from "../context/auth/AuthContext"
import { types } from "../context/types";


import { FiLogIn } from "react-icons/fi"
import { FiLogOut } from "react-icons/fi"
import { Nav } from "react-bootstrap";
import { Image } from "react-bootstrap";


import logo from "../Image/logo.png";

const Heading = () => {

  let token = localStorage.getItem("token");

  const { dispatch, user } = useContext(AuthContext);


  const history = useHistory();

  const logout = () => {
   history.replace("/login");
    localStorage.removeItem("token");   
    dispatch({
      type: types.logout,
    });
  }


  return (
    <Nav
      className="shadow mb-4 w-100 py-2 d-flex align-items-center justify-content-between px-3"
      activeKey="/home"
      style={{ background: "#30475E" }}
    >
      <div className="d-flex">
        <Image src={logo} height={80} width={80} />
        <h5 className="fw-bold m-auto " style={{ color: "#f8f8f2" }}>
          Coin
          <span style={{ color: "#ffb86c" }}> Cp</span>
        </h5>
      </div>
      <div className="d-flex align-items-center" style={{ fontSize: ".9rem" }}>
        <Nav.Item>
          <Link to="/" className="mx-2 text-white hoverNavBar text-decoration-none pb-2">
            INICIO
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/coins" className="mx-2 text-white hoverNavBar text-decoration-none pb-2">
            MONEDAS
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="markets" className="mx-2 text-white hoverNavBar text-decoration-none pb-2">
            MERCADOS
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/nft" className="mx-2 text-white hoverNavBar text-decoration-none pb-2">
            NFT
          </Link>
        </Nav.Item>
      </div>

      <div className="text-white">
        {/* <input
          type="text"
          name="buscar"
          placeholder="Buscar"
          className="border-3 border-white rounded p-1 bg-dark"
          style={{ color: "#f8f8f2" }}
        /> */}

        {token ? (
          <div className="d-flex align-items-center">
            <h5 className="mx-4">Bienvenido <span style={{color: "#F05454"}}>{user.user.user_name}</span></h5>
            <Link
              to="/login"
              className="mx-2 text-white hoverNavBar text-decoration-none login"
              onClick={ logout }
            >
              <FiLogOut />
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="mx-2 text-white hoverNavBar text-decoration-none login "
            >
             <span>INICIA SESION <FiLogIn/></span>
            </Link>
            <Link
              to="/signup"
              className="mx-2 text-white hoverNavBar text-decoration-none"
            >
              REGISTRARSE
            </Link>
          </div>
        )}
      </div>
    </Nav>
  );
};

export default Heading;
