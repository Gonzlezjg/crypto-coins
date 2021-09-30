import React, { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/auth/AuthContext";
import { types } from "../../context/types";

import { useForm } from "react-hook-form";

import ModalLogin from "../../helpers/ModalLogin";

import { FiLogIn } from "react-icons/fi";

export const ModalLog = () => {
  const [modalShow, setModalShow] = useState(false);

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
        setModalShow(false);
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
    <>
      <button className="mx-2 login fw-bold" onClick={() => setModalShow(true)}>
        <span className="login-content">
          Iniciar sesión <FiLogIn />
        </span>
      </button>
      <ModalLogin
        show={modalShow}
        onHide={() => setModalShow(false)}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </>
  );
};
