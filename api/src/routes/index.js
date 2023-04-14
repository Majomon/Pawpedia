const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerDog= require("./routerDog")
const routerTemperament= require("./routerTemperament")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", routerDog);

router.use("/temperament", routerTemperament)


module.exports = router;
