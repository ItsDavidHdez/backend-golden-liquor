"use strict";
const Admin = require("../models/admin");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helpers/jwt");

const registro_admin = async function (req, res) {
  const data = req.body;
  let admin_arr = [];

  admin_arr = await Admin.find({ email: data.email });

  if (admin_arr.length === 0) {
    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          const reg = await Admin.create(data);
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

const login_admin = async function (req, res) {
  const data = req.body;
  let admin_arr = [];

  admin_arr = await Admin.find({ email: data.email });

  if (admin_arr.length === 0) {
    res.status(200).send({ message: "No hay ningún correo", data: undefined });
  } else {
    let user = admin_arr[0];
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
  registro_admin,
  login_admin,
};
