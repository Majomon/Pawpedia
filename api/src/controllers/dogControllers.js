const { Dog } = require("../db");
const axios = require("axios");
const { URL, KEY } = process.env;

// Traigo todos los perros
const getAllDogs = async (req, res) => {
  try {
    const response = await axios.get(`${URL}?key=${KEY}`);
    if (response.data.length === 0) {
      throw new Error(`Hubo un error en la petición a la Api`);
    }
    const dogs = response.data.map(
      ({ id, name, image, height, weight, life_span }) => ({
        id,
        name,
        image: image.url,
        height,
        weight,
        life_span,
      })
    );
    return dogs;
  } catch (error) {
    return { error: error.message };
  }
};

// Pidiendo perros por ID
const getDogId = async (id) => {
  try {
    const response = await axios.get(`${URL}?key=${KEY}`);
    const search = response.data.find((dog) => dog.id == id);

    if (!search) {
      // si no se encontró ningún perro con el id dado, respondemos con un error
      throw new Error(`No se encontró ningún perro con el ID ${id}`);
    }

    const dogId = {
      id: search.id,
      name: search.name,
      image: search.image.url,
      height: search.height,
      weight: search.weight,
      life_span: search.life_span,
      temperament: search.temperament,
    };

    return dogId;
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
