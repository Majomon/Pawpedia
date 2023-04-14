const { Router } = require("express");

const routerTemperament = Router();

const handlerRouterTemperament=require("../handlers/handlerRouterTemperament")

routerTemperament.get("/",handlerRouterTemperament);

module.exports = routerTemperament;