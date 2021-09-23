import React, { useState, useContext } from "react";

import { AuthContext } from "../context/auth/AuthContext";
import { types } from "../context/types";

import { appendErrors, useForm } from "react-hook-form";

import axios from "axios";

import { FaBitcoin } from "react-icons/fa";
import { Card, Button, Alert, Image } from "react-bootstrap";

const Login = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { dispatch } = useContext(AuthContext);

  const [state, setState] = useState({
    loginError: false,
    loginStatus: false,
  });

  const onSubmit = async (data) => {
    const url = `https://crypto-ap.herokuapp.com/api/auth/login`;

    const body = {
      email: data.email,
      password: data.password,
    };

    await axios
      .post(url, body)
      .then((response) => {
        if (response.status === 401) {
          setState({
            loginError: true,
            loginStatus: false,
          });

          throw new Error("Usuario no Autorizado");
        } else {
          return response;
        }
      })
      .then((data) => {
        const token = data.data.token;

        localStorage.setItem("token", token);

        const lastPath = localStorage.getItem("lastPath") || "/";

        setState({
          loginError: false,
          loginStatus: true,
        });

        dispatch({
          type: types.login,
          payload: {
            user: data.data.user,
          },
        });

        history.replace(lastPath);
      })
      .catch((error) => {

        setState({
          loginError: true,
        });

        setTimeout(() => {
          setState({
            loginError: false,
          });
        }, 3000);
      });
    
  };

 

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h3 className="my-4 fw-bold">
        Inicia sesión para conocer mas sobre las cryptomonedas
      </h3>

      <Card bg="dark" style={{ width: "18rem" }} className="mb-2 py-4 ">
        <Card.Header className="text-center mt-3" style={{ color: "#F05454" }}>
          ¡Bienvenido de nuevo!
        </Card.Header>
        <div>
          {state.loginError ? (
            <div>
              
              <Alert variant="danger" className="text-center">Email o contraseña no validas</Alert>
           
            </div>
          ) : (
            ""
          )}
        </div>
        <Card.Body className="text-center ">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <input
              className="mb-4 w-100 p-2"
              type="text"
              name="email"
              placeholder="Ingrese su email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <input
              className="mb-4 w-100 p-2"
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              {...register("password", { required: true, min: 8 })}
            />

            <Button
              type="submit"
              className="w-100 border-0 p-4 text-center"
              style={{ backgroundColor: "#F05454" }}
            >
              Iniciar sesion <FaBitcoin className="fw-bold fs-5" />
            </Button>
          </form>
        </Card.Body>
      </Card>
     
    </div>
  );
};

export default Login;
