import React from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import { Card, Button } from "react-bootstrap";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const url = `https://crypto-ap.herokuapp.com/api/users`;

    const body = {
      user_name: data.user_name,
      email: data.email,
      password: data.password,
      rol: "USER",
    };

    await axios
      .post(url, body)
      .then((response) => {
        if(response) {
            return window.location ='/login';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card bg="dark" style={{ width: "18rem" }} className="mb-2 ">
        <Card.Header className="text-center mt-3">Registrate</Card.Header>
        <Card.Body className="text-center ">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
           
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
