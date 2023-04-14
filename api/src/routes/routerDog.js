const { Router } = require("express");

const routerDog = Router();

const {
  getDogHandler,
  getDogHanlderQuery,
  getDogHanlderId,
  getDogHanlderPost,
} = require("../handlers/handlerRouterDog");


//Peticiones tipo GET
routerDog.get("/",getDogHandler);

routerDog.get("/name",getDogHanlderQuery);

routerDog.get("/:id",getDogHanlderId);

//Peticiones tipo POST
routerDog.post("/",getDogHanlderPost);

module.exports = routerDog;
