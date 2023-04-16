const { Dog } = require("../db");
const axios = require("axios");
const { URL, KEY } = process.env;
const { Op } = require("sequelize");

//*Función para desestructurar
const des = (obj) => {
  return {
    id: obj.id,
    name: obj.name,
    image: obj.image.url,
    height: obj.height.metric,
    weight: obj.weight.metric,
    life_span: obj.life_span,
  };
};

//*Funcion para traer filtrado los datos de la BD y API
const cleanArray = (arr) => {
  const clean = arr.map((elem) => {
    return des(elem);
  });
  return clean;
};

// Traigo todos los perros
const getAllDogs = async (req, res) => {
  //Busqueda en la Api
  const apiDogsRaw = (await axios.get(`${URL}?key=${KEY}`)).data;
  //Busqueda en la BDD
  const bddRaw = await Dog.findAll();

  //Manera 1 usando una función
  const dogs = cleanArray(apiDogsRaw);

  //Manera 2
  const bdd = bddRaw.map(({ id, name, image, height, weight, life_span }) => ({
    id,
    name,
    image,
    height,
    weight,
    life_span,
  }));
  return [...dogs, ...bdd];
};

// Pidiendo perros por ID
const getDogId = async (id, source) => {
  if (source === "api") {
    const response = await axios.get(`${URL}?key=${KEY}`);
    const search = response.data.find((dog) => dog.id == id);
    if (!search) {
      // si no se encontró ningún perro con el id dado, respondemos con un error
      throw new Error(`No se encontró ningún perro con el ID: ${id} en la API`);
    } else {
      const filtroProp = des(search);
      filtroProp.temperament = search.temperament;
      return filtroProp;
    }
  } else {
    const search = await Dog.findByPk(id);
    if (!search) {
      throw new Error(`No se encontró ningún perro con el ID: ${id} en la BDD`);
    } else {
      return search;
    }
  }
};

// Pidiendo perro por Query
const getDogName = async (name) => {
  const dbApi = (await axios.get(`${URL}/search?q=${name}`)).data;

  // Con el iLike primero debo poner la propiedad en donde buscare y luego el valor anteponiendo Op.ilike
  const dbPi = await Dog.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });

  if (typeof name == "string") {
    if (dbApi.length > 0 || dbPi.length > 0) {
      return [...dbApi, ...dbPi];
    } else {
      throw new Error(`No existe el perro de Raza: ${name}`);
    }
  } else {
    throw new Error(`Ingresa una cadena de texto`);
  }
};

// Creando un perro
const createDog = async (newDog) => {
  const dog = await Dog.create(newDog);
  return dog;
};

module.exports = { createDog, getDogId, getDogName, getAllDogs };
