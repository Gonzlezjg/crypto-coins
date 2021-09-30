import React from 'react'

import { Modal } from "react-bootstrap";

export function ModalSign(props) {

    const { handleSubmit , register, onSubmit, error } = props;

    return (
      <Modal
        {...props}
        size="md"
        dialogClassName="modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div 
        className="modal-style">
        <Modal.Header closeButton style={{borderBottom: "none"}}>
          <Modal.Title id="contained-modal-title-vcenter" >Registrate</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-100">
              <div>
                {error ? (
                  <div>
                    <Alert variant="danger">
                      Ha ocurrido un error <p>{error.errors[0].msg}</p>
                    </Alert>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <p>Nombre de usuario</p>
              <input
                className="mb-4 w-100 p-2 input-form"
                type="text"
                name="user_name"
                placeholder="Ingrese un nombre de usuario"
                {...register("user_name", {
                  required: true,
                  maxLength: 80,
                })}
              />
              <p>Correo electronico</p>
              <input
                className="mb-4 w-100 p-2 input-form"
                type="text"
                name="email"
                placeholder="Ingrese un email"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              />
              <p>Contraseña</p>
              <input
                className="mb-4 w-100 p-2 input-form"
                type="password"
                name="password"
                placeholder="Cree su contraseña"
                {...register("password", { required: true, min: 8 })}
              />
  
              <button
                type="submit"
                className="my-4 btn-default w-100"
              >
                Registrar
              </button>
            </form>
          </div>
        </Modal.Body>
      </div>
      </Modal>
    );
  }