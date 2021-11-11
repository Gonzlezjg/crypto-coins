import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useHistory } from "react-router-dom";

import { ModalSign } from "../../helpers/ModalSign";

import "../../App.css"

export const SignUpModal = () => {
  const [modalShow, setModalShow] = useState(false);

  const [error, setError] = useState("");

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const url = `https://crypto-ap.herokuapp.com/api/users`;

    const body = {
      user_name: data.user_name,
      email: data.email,
      password: data.password,
      rol: "USER",
    };

    await axios
      .post(url, body)
      .then((res) => {
        if (res) {
          return res;
        }
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data);
        }
      });
  };

  return (
    <>
      <button className="btn-default fw-bold" type="submit"  onClick={() => setModalShow(true)}>
        Registrarse
      </button>

      <ModalSign
        show={modalShow}
        onHide={() => setModalShow(false)}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
};
