const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs= require("../controllers/getDogs")
const getDogId=require("../controllers/getDogId")
const getDogName=require("../controllers/getDogName")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs",getDogs)

router.get("/dogs/:id",getDogId)

router.get("/dogs/name/",getDogName)


module.exports = router;
