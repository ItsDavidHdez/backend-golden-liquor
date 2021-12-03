"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ClientSchema = Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  perfil: {
    type: String,
    required: true,
    default: "perfil.png",
  },
  telefono: {
    type: String,
    required: false,
  },
  genero: {
    type: String,
    required: false,
  },
  f_nacimiento: {
    type: String,
    required: false,
  },
  dni: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("cliente", ClientSchema);
