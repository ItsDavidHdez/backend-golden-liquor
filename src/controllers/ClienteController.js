"use strict";

const Cliente = require("../models/cliente");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helpers/jwt");

const registro_cliente = async function (req, res) {
  const data = req.body;
  let clientes_arr = [];

  clientes_arr = await Cliente.find({ email: data.email });

  if (clientes_arr.length === 0) {
    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          const reg = await Cliente.create(data);
          res.status(200).send({ data: reg });
        } else {
          res.status(200).send({ message: "Server error", data: undefined });
        }
      });
    } else {
      res
        .status(200)
        .send({ message: "La contraseña está vacía", data: undefined });
    }
  } else {
    res
      .status(200)
      .send({ message: "El correo ya existe en la DB", data: undefined });
  }
};

const login_cliente = async function (req, res) {
  const data = req.body;
  let cliente_arr = [];

  cliente_arr = await Cliente.find({ email: data.email });

  if (cliente_arr.length === 0) {
    res.status(200).send({ message: "No hay ningún correo", data: undefined });
  } else {
    let user = cliente_arr[0];
    bcrypt.compare(data.password, user.password, async function (error, check) {
      if (check) {
        res.status(200).send({ data: user, token: jwt.createToken(user) });
      } else {
        res
          .status(200)
          .send({ message: "La contraseña no coincide", data: undefined });
      }
    });
  }
};

module.exports = {
  registro_cliente,
  login_cliente,
};
