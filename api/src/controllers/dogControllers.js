const { Dog } = require("../db");
const axios = require("axios");
const { URL, KEY } = process.env;

// Traigo todos los perros
const getAllDogs = async (req, res) => {
  try {
    //Busqueda en la Api
    const apiDogsRaw = (await axios.get(`${URL}?key=${KEY}`)).data;
    //Busqueda en la BDD
    const bddRaw = await Dog.findAll();

    const dogs = apiDogsRaw.map(
      ({ id, name, image, height, weight, life_span }) => ({
        id,
        name,
        image: image.url,
        height: height.metric,
        weight: weight.metric,
        life_span,
      })
    );

    const bdd = bddRaw.map(
      ({ id, name, image, height, weight, life_span }) => ({
        id,
        name,
        image,
        height,
        weight,
        life_span,
      })
    );
    return [...dogs, ...bdd];
  } catch (error) {
    return { error: error.message };
  }
};

// Pidiendo perros por ID
const getDogId = async (id, source) => {
  try {
    if (source === "api") {
      const response = await axios.get(`${URL}?key=${KEY}`);
      const search = response.data.find((dog) => dog.id == id);
      if (!search) {
        // si no se encontró ningún perro con el id dado, respondemos con un error
        throw new Error(
          `No se encontró ningún perro con el ID ${id} en la API`
        );
      } else {
        return {
          id: search.id,
          name: search.name,
          image: search.image.url,
          height: search.height.metric,
          weight: search.weight.metric,
          life_span: search.life_span,
          temperament: search.temperament,
        };
      }
    } else {
      const search = await Dog.findByPk(id);
      if (!search) {
        throw new Error(
          `No se encontró ningún perro con el ID ${id} en la BDD`
        );
      } else {
        return search;
      }
    }
  } catch (error) {
    return { error: error.message };
  }
};

// Pidiendo perro por Query
const getDogName = async (name) => {
  try {
    const response = await axios.get(`${URL}/search?q=${name}`);

    if (response.data.length === 0) {
      throw new Error(`No se encontró ningún perro de raza: ${name}`);
    }
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

// Creando un perro
const createDog = async (newDog) => {
  const dog = await Dog.create(newDog);
  return dog;
};

module.exports = { createDog, getDogId, getDogName, getAllDogs };
