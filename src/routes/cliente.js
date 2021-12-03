"use strict";

const express = require("express");
const ClientController = require("../controllers/ClienteController");

const api = express.Router();

api.post("/registro_cliente", ClientController.registro_cliente);
api.post("/login_cliente", ClientController.login_cliente);

module.exports = api;
