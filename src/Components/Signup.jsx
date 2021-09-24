import React, {useState} from "react";
import { useForm } from "react-hook-form";

import {
  Redirect,
} from "react-router-dom";

import axios from "axios";

import { Card, Button, Alert } from "react-bootstrap";

const Signup = () => {

  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    

    const url = `https://crypto-ap.herokuapp.com/api/users`;

    const body =  {
      user_name: data.user_name,
      email: data.email,
      password: data.password,
      rol: "USER",
      };

      await axios.post(url, body)
      .then( res => {
        if ( res ) {
          return window.location = "/login"
          // return <Redirect to="/login" />
        }
      })
      .catch( error =>{
         if (error.response) {
          setError(error.response.data);
      }} )

    };
    
   
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card bg="dark" style={{ width: "18rem" }} className="mb-2 ">
        <Card.Header className="text-center mt-3">Registrate</Card.Header>
        <Card.Body className="text-center ">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <div>

              {error
                ?<div>
                  <Alert variant="danger" >Ha ocurrido un error <p>{error.errors[0].msg}</p></Alert>
                </div>
                : ''
              }

            </div>
            <input
              className="mb-4 w-100 p-2"
              type="text"
              name="user_name"
              placeholder="Ingrese un nombre de usuario"
              {...register("user_name", {
                required: true,
                maxLength: 80,
              })}
            />
            <input
              className="mb-4 w-100 p-2"
              type="text"
              name="email"
              placeholder="Ingrese un email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <input
              className="mb-4 w-100 p-2"
              type="password"
              name="password"
              placeholder="Cree su contraseña"
              {...register("password", { required: true, min: 8 })}
            />

            <Button
              type="submit"
              className="w-100 border-0"
              style={{ backgroundColor: "#F05454" }}
            >
              Registrar
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
