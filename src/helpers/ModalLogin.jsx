import React from "react";

import { Modal } from "react-bootstrap";

import { FaBitcoin } from "react-icons/fa";

const ModalLogin = (props) => {
  
  const { register, handleSubmit, onSubmit } = props;

  return (
    <Modal
      {...props}
      size="md"
      dialogClassName="modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modal-style">
        <Modal.Header closeButton style={{ borderBottom: "none" }}>
          <Modal.Title id="contained-modal-title-vcenter">
           ¡ Bienvenido de vuelta !
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            
           <p className="fw-bold"> ¿ Aun no tienes cuenta ? <a className="text-primary" >crear cuenta</a> </p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-100">
              <p>Ingrese su correo</p>
              <input
                className="mb-4 w-100 input-form"
                type="text"
                name="email"
                placeholder="Ingrese su email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <p>Ingresa tu contraseña</p>
              <input
                className="mb-4 w-100 input-form"
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                {...register("password", { required: true, min: 8 })}
              />

              <button
                type="submit"
                className="my-4 btn-default w-100"
              >
                Ingresar <FaBitcoin className="fw-bold fs-5" />
              </button>
            </form>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default ModalLogin;
